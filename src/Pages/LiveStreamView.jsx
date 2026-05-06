import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Eye, Wifi, WifiOff, Clock, Activity, Signal, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/shared/Loader";
import { toast } from "sonner";

import AgoraRTC from "agora-rtc-sdk-ng";

import {
  useEndStreamMutation,
  useGetStreamByIdQuery,
  useGiveWarningMutation,
} from "../redux/features/streams/streamsApi";
// import LiveChat from "@/Components/LiveChat";

// ─── helpers ────────────────────────────────────────────────────────────────

/** Format elapsed seconds → HH:MM:SS */
const formatDuration = (seconds) => {
  if (seconds == null || seconds < 0) return "00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
};

/**
 * Map Agora network-quality level (0-6) to a human label + colour class.
 * 0 = unknown, 1-2 = good, 3-4 = fair, 5-6 = poor
 */
const networkLabel = (level) => {
  if (level === 0) return { text: "Unknown", color: "text-gray-400", bg: "bg-gray-100" };
  if (level <= 2)  return { text: "Good",    color: "text-green-600",  bg: "bg-green-50" };
  if (level <= 4)  return { text: "Fair",    color: "text-yellow-600", bg: "bg-yellow-50" };
  return               { text: "Poor",    color: "text-red-500",    bg: "bg-red-50" };
};

/**
 * Available resolution options for the resolution switcher.
 * These are presented to the user; actual enforcement depends on the broadcaster's
 * published resolution — selecting a lower option reduces the local decode resolution.
 */
const RESOLUTION_OPTIONS = [
  { label: "Auto",  width: null,  height: null  },
  { label: "1080p", width: 1920,  height: 1080  },
  { label: "720p",  width: 1280,  height: 720   },
  { label: "480p",  width: 854,   height: 480   },
  { label: "360p",  width: 640,   height: 360   },
  { label: "240p",  width: 426,   height: 240   },
];

// ─── component ──────────────────────────────────────────────────────────────

const LiveStreamView = () => {
  const navigate   = useNavigate();
  const { id }     = useParams();

  const { data: streamData, isLoading, refetch } = useGetStreamByIdQuery(id);

  const [endStream,    { isLoading: isEnding }]    = useEndStreamMutation();
  const [giveWarning,  { isLoading: isWarninging }] = useGiveWarningMutation();

  // ── modal state ─────────────────────────────────────────────────────────
  const [isEndModalOpen,     setIsEndModalOpen]     = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [endReason,          setEndReason]          = useState("");
  const [warningType,        setWarningType]        = useState("");
  const [warningDescription, setWarningDescription] = useState("");

  // ── chat state ───────────────────────────────────────────────────────────


  // ── resolution switcher state ────────────────────────────────────────────
  const [selectedResolution, setSelectedResolution] = useState(RESOLUTION_OPTIONS[0]);
  const [showResolutionMenu,  setShowResolutionMenu]  = useState(false);
  const resMenuRef = useRef(null);

  const warningReasonOptions = [
    { value: "inappropriate_content", label: "Inappropriate content" },
    { value: "spam",                  label: "Spam or fraudulent behavior" },
    { value: "harassment",            label: "Harassment or hate speech" },
    { value: "nudity",                label: "Nudity or sexual content" },
    { value: "copyright_violation",   label: "Copyright violation" },
    { value: "other",                 label: "Other" },
  ];

  // ── Agora refs ───────────────────────────────────────────────────────────
  const agoraPlayerRef   = useRef(null);
  const agoraClientRef   = useRef(null);
  const leavingRef       = useRef(false);
  const joiningRef       = useRef(false);
  const joinedRef        = useRef(false);
  const statsTimerRef    = useRef(null);
  const activeVideoTrack = useRef(null); // ref to current remote video track

  // ── stream stats state ───────────────────────────────────────────────────
  const [stats, setStats] = useState({
    downlinkLevel: 0,
    rtt:           null,
    duration:      0,         // derived from API stream start time
    width:         null,
    height:        null,
    recvBitrate:   null,
    viewerCount:   0,         // tracked via Agora user-joined / user-left events
    remoteUids:    [],
  });

  // Viewer count is maintained as a ref so event handlers always see the
  // latest value without needing to re-register on every render.
  const viewerCountRef = useRef(0);

  const stream = streamData?.data?.playback ?? streamData?.data;

  // ── resolve stream start time ────────────────────────────────────────────
  // We prefer the API-provided start timestamp so the duration reflects the
  // full lifetime of the stream, not just the admin's viewing session.
  // Common field names: startedAt, startTime, created_at, createdAt.
  // Adjust the chain below to match your actual API shape.
  const streamStartTimestamp = (() => {
    const raw =
      streamData?.data?.stream?.startedAt   ??
      streamData?.data?.stream?.startTime   ??
      streamData?.data?.stream?.created_at  ??
      streamData?.data?.stream?.createdAt   ??
      streamData?.data?.playback?.startedAt ??
      null;
    if (!raw) return null;
    const t = new Date(raw).getTime();
    return isNaN(t) ? null : t;
  })();

  // ── close resolution menu when clicking outside ──────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (resMenuRef.current && !resMenuRef.current.contains(e.target)) {
        setShowResolutionMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── apply resolution to the active remote video track ───────────────────
  const applyResolution = useCallback(async (option) => {
    setSelectedResolution(option);
    setShowResolutionMenu(false);

    const track = activeVideoTrack.current;
    if (!track) return;

    try {
      if (option.width && option.height) {
        // setDecoderConfig is available in agora-rtc-sdk-ng >= 4.x for remote tracks.
        // It hints the decoder to down-scale the received video.
        if (typeof track.setDecoderConfig === "function") {
          await track.setDecoderConfig({ bitrateMin: 0, bitrateMax: 0 });
        }
        // setPlaybackDevice / setVolume are audio-only; for video the best we
        // can do is set an explicit CSS size on the player so the browser
        // scales the decoded frame down.
        if (agoraPlayerRef.current) {
          const video = agoraPlayerRef.current.querySelector("video");
          if (video) {
            video.style.width  = `${option.width}px`;
            video.style.height = `${option.height}px`;
            video.style.maxWidth  = "100%";
            video.style.maxHeight = "100%";
          }
        }
      } else {
        // "Auto" — restore to fill the container
        if (agoraPlayerRef.current) {
          const video = agoraPlayerRef.current.querySelector("video");
          if (video) {
            video.style.width  = "100%";
            video.style.height = "100%";
          }
        }
      }
    } catch (err) {
      console.warn("Resolution switch error:", err);
    }
  }, []);

  // ── leave ────────────────────────────────────────────────────────────────
  const leaveStream = useCallback(async () => {
    const client = agoraClientRef.current;
    if (!client || leavingRef.current) return;

    try {
      leavingRef.current = true;

      if (statsTimerRef.current) {
        clearInterval(statsTimerRef.current);
        statsTimerRef.current = null;
      }

      try {
        client.remoteUsers?.forEach((user) => {
          user.videoTrack?.stop?.();
          user.audioTrack?.stop?.();
        });
      } catch {
        console.warn("Error stopping remote tracks");
      }

      client.removeAllListeners?.();
      await client.leave();

      if (agoraPlayerRef.current) {
        agoraPlayerRef.current.innerHTML = "";
      }

      activeVideoTrack.current = null;
      joinedRef.current        = false;
      agoraClientRef.current   = null;
    } catch (err) {
      console.error("Leave stream error:", err);
    } finally {
      leavingRef.current = false;
    }
  }, []);

  // ── browser close / back ─────────────────────────────────────────────────
  useEffect(() => {
    const onPageHide     = () => leaveStream();
    const onBeforeUnload = () => leaveStream();
    window.addEventListener("pagehide",     onPageHide);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("pagehide",     onPageHide);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [leaveStream]);

  // ── Agora init ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!streamData?.data?.playback) return;

    const playerEl = agoraPlayerRef.current;

    const initAgora = async () => {
      try {
        if (joiningRef.current || joinedRef.current) return;

        const channel = streamData?.data?.playback?.viewerToken?.channelName;
        const token   = streamData?.data?.playback?.viewerToken?.token;
        const uid     = streamData?.data?.playback?.viewerToken?.uid;

        if (!channel || !token || !uid) return;

        joiningRef.current = true;

        const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
        agoraClientRef.current = client;

        await client.setClientRole("audience");

        const clearPlayer = () => {
          if (playerEl) playerEl.innerHTML = "";
          activeVideoTrack.current = null;
        };

        const subscribeAndPlay = async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            clearPlayer();
            user.videoTrack?.play(playerEl, { fit: "contain" });
            activeVideoTrack.current = user.videoTrack ?? null;
          }

          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        };

        client.on("user-published", async (user, mediaType) => {
          await subscribeAndPlay(user, mediaType);
        });

        client.on("user-unpublished", (_user, mediaType) => {
          if (mediaType === "video") clearPlayer();
        });

        client.on("user-left", clearPlayer);

        // ── network quality ────────────────────────────────────────────────
        client.on("network-quality", (quality) => {
          setStats((prev) => ({
            ...prev,
            downlinkLevel: quality.downlinkNetworkQuality ?? prev.downlinkLevel,
          }));
        });

        // ── Agora-sourced viewer count ─────────────────────────────────────
        // We maintain a running count via user-joined / user-left events.
        // This reflects the actual number of participants Agora sees in the
        // channel (broadcaster + other audience members).
        client.on("user-joined", (user) => {
          viewerCountRef.current += 1;
          setStats((prev) => ({
            ...prev,
            viewerCount: viewerCountRef.current,
            remoteUids:  [...new Set([...prev.remoteUids, user.uid])],
          }));
        });

        client.on("user-left", (user) => {
          viewerCountRef.current = Math.max(0, viewerCountRef.current - 1);
          setStats((prev) => ({
            ...prev,
            viewerCount: viewerCountRef.current,
            remoteUids:  prev.remoteUids.filter((u) => u !== user.uid),
          }));
        });

        // ── join ───────────────────────────────────────────────────────────
        await client.join(import.meta.env.VITE_AGORA_APP_ID, channel, token, uid);

        // Seed viewer count from currently connected remote users
        viewerCountRef.current = client.remoteUsers.length;

        for (const user of client.remoteUsers) {
          if (user.hasVideo) await subscribeAndPlay(user, "video");
          if (user.hasAudio) await subscribeAndPlay(user, "audio");
        }

        setStats((prev) => ({
          ...prev,
          viewerCount: viewerCountRef.current,
          remoteUids:  client.remoteUsers.map((u) => u.uid),
        }));

        joinedRef.current = true;

        // ── stats polling ──────────────────────────────────────────────────
        statsTimerRef.current = setInterval(() => {
          const c = agoraClientRef.current;
          if (!c) return;

          // ── Duration: use API stream start time if available, ──────────
          // otherwise fall back to a "session joined" reference time.
          // streamStartTimestamp is captured in closure from the outer scope.
          const durationSeconds = streamStartTimestamp
            ? Math.max(0, Math.floor((Date.now() - streamStartTimestamp) / 1000))
            : 0;

          // ── RTC stats (RTT, bitrate) ───────────────────────────────────
          let rtt         = null;
          let recvBitrate = null;
          try {
            const rtcStats = c.getRTCStats();
            rtt         = rtcStats?.RTT ?? null;
            recvBitrate = rtcStats?.RecvBitrate
              ? Math.round(rtcStats.RecvBitrate / 1000)
              : null;
          } catch {/* no-op */}

          // ── Per-user video stats (resolution) ─────────────────────────
          let width  = null;
          let height = null;
          try {
            const remoteVideoStats = c.getRemoteVideoStats();
            const firstUid = Object.keys(remoteVideoStats)[0];
            if (firstUid) {
              width  = remoteVideoStats[firstUid]?.receiveResolutionWidth  ?? null;
              height = remoteVideoStats[firstUid]?.receiveResolutionHeight ?? null;
            }
          } catch {/* no-op */}

          setStats((prev) => ({
            ...prev,
            duration:    durationSeconds,
            rtt,
            recvBitrate,
            width,
            height,
            // Viewer count is already kept up-to-date via events;
            // we sync from the ref here so the interval stays consistent.
            viewerCount: viewerCountRef.current,
          }));
        }, 2000);

      } catch (err) {
        console.error("Agora init error:", err);
        toast.error("Failed to join live stream");
        refetch();
      } finally {
        joiningRef.current = false;
      }
    };

    initAgora();

    return () => {
      leaveStream();
    };
  }, [
    streamData?.data?.playback,
    streamData?.data?.playback?.viewerToken?.channelName,
    streamData?.data?.playback?.viewerToken?.token,
    streamData?.data?.playback?.viewerToken?.uid,
    leaveStream,
    refetch,
    streamStartTimestamp,
  ]);

  // ── navigation ────────────────────────────────────────────────────────────
  const handleBack = async () => {
    await leaveStream();
    navigate("/dashboard/live-monitoring");
  };

  // ── modals ────────────────────────────────────────────────────────────────
  const openEndStreamModal = () => { setEndReason(""); setIsEndModalOpen(true); };
  const openWarningModal   = () => {
    setWarningType(""); setWarningDescription(""); setIsWarningModalOpen(true);
  };

  const confirmEndStream = async () => {
    if (!endReason.trim()) return toast.error("Please enter a reason to end the stream.");
    try {
      const res = await endStream({ id, data: { reason: endReason.trim() } });
      if (res?.error)        return toast.error(res.error.data?.message);
      if (res.data?.success) {
        toast.success(res.data.message);
        await leaveStream();
        setIsEndModalOpen(false);
        navigate("/dashboard/live-monitoring");
      }
    } catch (err) { console.error(err); }
  };

  const confirmGiveWarning = async () => {
    if (!warningType)               return toast.error("Please select a warning reason.");
    if (!warningDescription.trim()) return toast.error("Please enter a warning description.");
    try {
      const res = await giveWarning({
        id,
        data: { reason: warningType, severity: "warning", description: warningDescription.trim() },
      });
      if (res?.error)        return toast.error(res.error.data?.message);
      if (res.data?.success) { toast.success(res.data.message); setIsWarningModalOpen(false); }
    } catch (err) { console.error(err); }
  };

  // ── derived ───────────────────────────────────────────────────────────────
  const netInfo = networkLabel(stats.downlinkLevel);

  if (isLoading) return <Loader />;
  if (!stream)   { navigate("/dashboard/live-monitoring"); return null; }

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC] min-h-[100dvh]">
      {/* Back */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-8 hover:text-[#FFC12D]"
      >
        <ArrowLeft size={18} />
        Back to dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100dvh-140px)] min-h-0">
        <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">

          {/* ── Video player ─────────────────────────────────────────────── */}
          <div className="relative flex-1 min-h-[320px] lg:min-h-[500px] bg-black rounded-3xl overflow-hidden">
            <style>{`
              #agora-player video {
                object-fit: contain !important;
                width: 100% !important;
                height: 100% !important;
              }
            `}</style>

            <div
              id="agora-player"
              ref={agoraPlayerRef}
              className="absolute inset-0 z-50"
            />

            {/* Fallback banner when not yet streaming */}
            {!streamData?.data?.playback && (
              <img
                src={streamData?.data?.stream?.banner || "https://picsum.photos/1200/800"}
                className="w-full h-full object-contain"
                alt=""
              />
            )}

            {/* LIVE badge + viewer count */}
            <div className="absolute top-6 left-6 flex gap-2 z-50">
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                LIVE
              </span>
              <span className="bg-black/40 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                <Eye size={14} />
                {/* Viewer count is sourced from Agora user events */}
                {stats.viewerCount}
              </span>
            </div>

            {/* ── Stats overlay (top-right corner) ─────────────────────── */}
            <div className="absolute top-6 right-6 z-50 flex flex-col gap-1.5 items-end">
              {/* Network quality pill */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm bg-black/50 ${netInfo.color}`}
              >
                {stats.downlinkLevel === 0 || stats.downlinkLevel > 4
                  ? <WifiOff size={12} />
                  : <Wifi size={12} />
                }
                {netInfo.text}
              </div>

              {/* RTT / ping */}
              {stats.rtt !== null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
                  <Activity size={12} className="text-blue-300" />
                  {stats.rtt} ms
                </div>
              )}

              {/* Bitrate */}
              {stats.recvBitrate !== null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
                  <Signal size={12} className="text-purple-300" />
                  {stats.recvBitrate} kbps
                </div>
              )}

              {/* ── Resolution pill (clickable) ───────────────────────── */}
              <div className="relative" ref={resMenuRef}>
                <button
                  onClick={() => setShowResolutionMenu((v) => !v)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                  title="Change resolution"
                >
                  <span className="text-gray-300 font-mono">
                    {stats.width && stats.height
                      ? `${stats.width}×${stats.height}`
                      : selectedResolution.label === "Auto"
                        ? "RES"
                        : selectedResolution.label}
                  </span>
                  <span className="text-gray-400 text-[10px]">▾</span>
                </button>

                {showResolutionMenu && (
                  <div className="absolute right-0 top-full mt-1 w-28 bg-gray-900/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl z-50 border border-white/10">
                    {RESOLUTION_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => applyResolution(opt)}
                        className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${
                          selectedResolution.label === opt.label
                            ? "bg-white/20 text-white"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Stream duration — sourced from API stream start time */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
                <Clock size={12} className="text-yellow-300" />
                {formatDuration(stats.duration)}
              </div>
            </div>

         
          </div>

          {/* ── Stats bar (below video) ───────────────────────────────────── */}
          {streamData?.data?.playback && (
            <div className="flex flex-wrap gap-3">
              <StatPill
                icon={<Wifi size={14} />}
                label="Network"
                value={netInfo.text}
                valueClass={netInfo.color}
              />
              <StatPill
                icon={<Activity size={14} />}
                label="Ping"
                value={stats.rtt !== null ? `${stats.rtt} ms` : "—"}
              />
              <StatPill
                icon={<Signal size={14} />}
                label="Bitrate"
                value={stats.recvBitrate !== null ? `${stats.recvBitrate} kbps` : "—"}
              />
              {/* Resolution stat pill — also clickable to open switcher */}
              <div
                className="relative flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
                onClick={() => setShowResolutionMenu((v) => !v)}
                title="Click to change resolution"
              >
                <span className="text-gray-400"><span className="text-xs font-mono">RES</span></span>
                <span className="text-xs text-gray-400 font-medium">Resolution</span>
                <span className="text-xs font-bold text-gray-800">
                  {stats.width && stats.height
                    ? `${stats.width}×${stats.height}`
                    : selectedResolution.label}
                </span>
                <span className="text-gray-400 text-[10px]">▾</span>
              </div>
              <StatPill
                icon={<Clock size={14} />}
                label="Duration"
                value={formatDuration(stats.duration)}
              />
              {/* Viewer count — sourced from Agora */}
              <StatPill
                icon={<Eye size={14} />}
                label="Viewers"
                value={stats.viewerCount}
              />
            </div>
          )}

          {/* ── Live chat (hidden by default, toggled via button) ─────────── */}
       

          {/* ── Stream info + action buttons ─────────────────────────────── */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{streamData?.data?.stream?.title}</h1>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={streamData?.data?.stream?.streamer?.image || "https://picsum.photos/200"}
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <div>
                  <div className="font-bold">{streamData?.data?.stream?.streamer?.name}</div>
                  <div className="text-xs text-gray-400">Followers: N/A</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={openWarningModal}
                className="px-6 py-2.5 bg-yellow-400 rounded-xl text-white font-bold"
              >
                Give Warning
              </button>
              <button
                onClick={openEndStreamModal}
                className="px-6 py-2.5 bg-red-500 rounded-xl text-white font-bold"
              >
                End Stream
              </button>
            </div>
          </div>

        </div>
        {/* <LiveChat></LiveChat> */}
      </div>

      {/* ── End stream modal ─────────────────────────────────────────────── */}
      {isEndModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-xl font-bold">End Stream</h2>
                <p className="text-sm text-gray-500 mt-1">Enter the reason for ending this stream.</p>
              </div>
              <button onClick={() => setIsEndModalOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <label className="font-semibold text-sm text-gray-700">Reason</label>
              <textarea
                value={endReason}
                onChange={(e) => setEndReason(e.target.value)}
                rows={5}
                className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none focus:border-[#FFC12D] focus:ring-2 focus:ring-[#FFC12D]/20"
                placeholder="Type the reason to end the stream..."
              />
            </div>
            <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row sm:justify-end">
              <button
                onClick={() => setIsEndModalOpen(false)}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >Cancel</button>
              <button
                onClick={confirmEndStream}
                className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600"
              >{isEnding ? "Ending..." : "Confirm End Stream"}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Give warning modal ───────────────────────────────────────────── */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-xl font-bold">Give Warning</h2>
                <p className="text-sm text-gray-500 mt-1">Select a warning reason and provide a description.</p>
              </div>
              <button onClick={() => setIsWarningModalOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="font-semibold text-sm text-gray-700 block">Warning reason</label>
                <select
                  value={warningType}
                  onChange={(e) => setWarningType(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-900 outline-none focus:border-[#FFC12D] focus:ring-2 focus:ring-[#FFC12D]/20"
                >
                  <option value="">Select a reason</option>
                  {warningReasonOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700 block">Description</label>
                <textarea
                  value={warningDescription}
                  onChange={(e) => setWarningDescription(e.target.value)}
                  rows={5}
                  className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none focus:border-[#FFC12D] focus:ring-2 focus:ring-[#FFC12D]/20"
                  placeholder="Describe why this warning is being issued..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row sm:justify-end">
              <button
                onClick={() => setIsWarningModalOpen(false)}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >Cancel</button>
              <button
                onClick={confirmGiveWarning}
                className="rounded-2xl bg-[#FFC12D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e4b336]"
              >{isWarninging ? "Sending..." : "Confirm Warning"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── small reusable stat pill ────────────────────────────────────────────────
const StatPill = ({ icon, label, value, valueClass = "text-gray-800" }) => (
  <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
    <span className="text-gray-400">{icon}</span>
    <span className="text-xs text-gray-400 font-medium">{label}</span>
    <span className={`text-xs font-bold ${valueClass}`}>{value}</span>
  </div>
);

export default LiveStreamView;