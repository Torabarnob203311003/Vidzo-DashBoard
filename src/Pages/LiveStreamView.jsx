import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Send, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
import Loader from "@/Components/shared/Loader";
import { toast } from "sonner";

import AgoraRTC from "agora-rtc-sdk-ng";

import {
  useEndStreamMutation,
  useGetStreamByIdQuery,
  // useGetStreamChatQuery,
  useGiveWarningMutation,
  // useSendChatMessageMutation,
} from "@/redux/features/streams/streamsApi";

const LiveStreamView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: streamData, isLoading, refetch } = useGetStreamByIdQuery(id);
  // const { data: chatResponse } = useGetStreamChatQuery({ id, page: 1, limit: 50 }, { skip: !id });
  // const { user, token } = useSelector((state) => state.auth);

  // const [sendMessage, { isLoading: isSending }] = useSendChatMessageMutation();

  const [endStream, { isLoading: isEnding }] = useEndStreamMutation();

  const [giveWarning, { isLoading: isWarninging }] = useGiveWarningMutation();

  // const [chatMessages, setChatMessages] = useState([]);
  // const socketRef = useRef(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [endReason, setEndReason] = useState("");
  const [warningType, setWarningType] = useState("");
  const [warningDescription, setWarningDescription] = useState("");

  const warningReasonOptions = [
    { value: "inappropriate_content", label: "Inappropriate content" },
    { value: "spam", label: "Spam or fraudulent behavior" },
    { value: "harassment", label: "Harassment or hate speech" },
    { value: "nudity", label: "Nudity or sexual content" },
    { value: "copyright_violation", label: "Copyright violation" },
    { value: "other", label: "Other" },
  ];

  // const { register, handleSubmit, reset } = useForm();

  const agoraPlayerRef = useRef(null);
  const agoraClientRef = useRef(null);
  const leavingRef = useRef(false);
  const joiningRef = useRef(false);
  const joinedRef = useRef(false);

  const stream = streamData?.data?.playback ?? streamData?.data;

  // =========================
  // UNIVERSAL LEAVE STREAM
  // =========================
  const leaveStream = useCallback(async () => {
    const client = agoraClientRef.current;

    if (!client || leavingRef.current) return;

    try {
      leavingRef.current = true;

      // Stop any remote playback
      try {
        client.remoteUsers?.forEach((user) => {
          user.videoTrack?.stop?.();
          user.audioTrack?.stop?.();
        });
      } catch {
        console.warn("Error stopping remote tracks, they might have already been stopped");
      }

      // Remove listeners
      client.removeAllListeners?.();

      // Leave channel
      await client.leave();

      // Clear player DOM
      if (agoraPlayerRef.current) {
        agoraPlayerRef.current.innerHTML = "";
      }

      joinedRef.current = false;
      agoraClientRef.current = null;
    } catch (err) {
      console.error("Leave stream error:", err);
    } finally {
      leavingRef.current = false;
    }
  }, []);

  // =========================
  // HANDLE BROWSER BACK/FORWARD/TAB CLOSE
  // =========================
  useEffect(() => {
    const handlePageHide = () => {
      leaveStream();
    };

    const handleBeforeUnload = () => {
      leaveStream();
    };

    window.addEventListener("pagehide", handlePageHide);

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);

      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveStream]);

  // =========================
  // AGORA INIT
  // =========================
  useEffect(() => {
    if (!streamData?.data?.playback) return;

    const playerEl = agoraPlayerRef.current;

    const initAgora = async () => {
      try {
        if (joiningRef.current || joinedRef.current) {
          return;
        }

        const channel = streamData?.data?.playback?.viewerToken?.channelName;

        const token = streamData?.data?.playback?.viewerToken?.token;

        const uid = streamData?.data?.playback?.viewerToken?.uid;

        if (!channel || !token || !uid) return;

        joiningRef.current = true;

        const client = AgoraRTC.createClient({
          mode: "live",
          codec: "vp8",
        });

        agoraClientRef.current = client;

        await client.setClientRole("audience");

        const clearPlayer = () => {
          if (playerEl) {
            playerEl.innerHTML = "";
          }
        };

        const subscribeAndPlay = async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            clearPlayer();
            user.videoTrack?.play(playerEl);
          }

          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        };

        client.on("user-published", async (user, mediaType) => {
          await subscribeAndPlay(user, mediaType);
        });

        client.on("user-unpublished", (_user, mediaType) => {
          if (mediaType === "video") {
            clearPlayer();
          }
        });

        client.on("user-left", clearPlayer);

        await client.join(
          import.meta.env.VITE_AGORA_APP_ID,
          channel,
          token,
          uid,
        );

        for (const user of client.remoteUsers) {
          if (user.hasVideo) {
            await subscribeAndPlay(user, "video");
          }

          if (user.hasAudio) {
            await subscribeAndPlay(user, "audio");
          }
        }

        joinedRef.current = true;
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
  ]);

  // =========================
  // CHAT
  // =========================
  // useEffect(() => {
  //   if (!chatResponse?.data) return;
  //   setChatMessages(chatResponse.data);
  // }, [chatResponse]);

  // useEffect(() => {
  //   if (!id || !token || !user?._id) return;

  //   socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
  //     auth: { token },
  //   });

  //   const socket = socketRef.current;

  //   socket.emit("stream:join", {
  //     streamId: id,
  //     userId: user._id,
  //   });

  //   socket.on("stream:message", (message) => {
  //     setChatMessages((prev) => [...prev, message]);
  //   });

  //   socket.on("stream:viewer-joined", (data) => {
  //     console.log(`Viewer joined. Total: ${data.viewerCount}`);
  //   });

  //   socket.on("stream:viewer-left", (data) => {
  //     console.log(`Viewer left. Total: ${data.viewerCount}`);
  //   });

  //   socket.on("stream:ended", (data) => {
  //     console.log("Stream ended:", data);
  //   });

  //   socket.on("error", (error) => {
  //     console.error("Socket error:", error);
  //   });

  //   return () => {
  //     const currentSocket = socketRef.current;
  //     if (!currentSocket) return;

  //     currentSocket.off("stream:message");
  //     currentSocket.off("stream:viewer-joined");
  //     currentSocket.off("stream:viewer-left");
  //     currentSocket.off("stream:ended");
  //     currentSocket.off("error");
  //     currentSocket.emit("stream:leave", {
  //       streamId: id,
  //       userId: user._id,
  //     });
  //     currentSocket.disconnect();
  //     socketRef.current = null;
  //   };
  // }, [id, token, user?._id]);

  // const onSendChat = async (data) => {
  //   try {
  //     const res = await sendMessage({
  //       id,
  //       data: {
  //         message: data.message,
  //       },
  //     });

  //     if (res?.error) {
  //       return toast.error(res.error.data?.message || "Failed to send");
  //     }

  //     if (res.data?.success) {
  //       setChatMessages((prev) => [
  //         ...prev,
  //         {
  //           _id: `local-${Date.now()}`,
  //           sender: {
  //             name: user?.name || "Admin",
  //             image: user?.image || "https://picsum.photos/32/32?seed=admin",
  //           },
  //           content: data.message,
  //           createdAt: new Date().toISOString(),
  //         },
  //       ]);

  //       reset();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // =========================
  // NAVIGATION WITH CLEANUP
  // =========================
  const handleBack = async () => {
    await leaveStream();
    navigate("/dashboard/live-monitoring");
  };

  const openEndStreamModal = () => {
    setEndReason("");
    setIsEndModalOpen(true);
  };

  const openWarningModal = () => {
    setWarningType("");
    setWarningDescription("");
    setIsWarningModalOpen(true);
  };

  const confirmEndStream = async () => {
    if (!endReason.trim()) {
      return toast.error("Please enter a reason to end the stream.");
    }

    try {
      const res = await endStream({
        id,
        data: {
          reason: endReason.trim(),
        },
      });

      if (res?.error) {
        return toast.error(res.error.data?.message);
      }

      if (res.data?.success) {
        toast.success(res.data.message);

        await leaveStream();

        setIsEndModalOpen(false);
        navigate("/dashboard/live-monitoring");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmGiveWarning = async () => {
    if (!warningType) {
      return toast.error("Please select a warning reason.");
    }

    if (!warningDescription.trim()) {
      return toast.error("Please enter a warning description.");
    }

    try {
      const res = await giveWarning({
        id,
        data: {
          reason: warningType,
          severity: "warning",
          description: warningDescription.trim(),
        },
      });

      if (res?.error) {
        return toast.error(res.error.data?.message);
      }

      if (res.data?.success) {
        toast.success(res.data.message);
        setIsWarningModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <Loader />;

  if (!stream) {
    navigate("/dashboard/live-monitoring");
    return null;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC] min-h-[100dvh]">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-8 hover:text-[#FFC12D]"
      >
        <ArrowLeft size={18} />
        Back to dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100dvh-140px)] min-h-0">
        <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">
          <div className="relative flex-1 min-h-[320px] lg:min-h-[500px] bg-black rounded-3xl overflow-hidden">
            <div ref={agoraPlayerRef} className="absolute inset-0 z-50" />

            {!streamData?.data?.playback && (
              <img
                src={
                  streamData?.data?.stream?.banner ||
                  "https://picsum.photos/1200/800"
                }
                className="w-full h-full object-cover"
                alt=""
              />
            )}

            <div className="absolute top-6 left-6 flex gap-2 z-50">
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                LIVE
              </span>

              <span className="bg-black/40 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                <Eye size={14} />
                {stream?.currentViewerCount || 0}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {streamData?.data?.stream?.title}
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={streamData?.data?.stream?.streamer?.image || "https://picsum.photos/200"}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <div className="font-bold">
                    {streamData?.data?.stream?.streamer?.name}
                  </div>

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

      {/* <div className="bg-white rounded-3xl border flex flex-col overflow-hidden min-h-0">
          <div className="p-6 border-b text-center font-bold">Live Chat</div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={msg._id || i} className="flex gap-3">
                <img
                  src={msg.sender?.image || `https://picsum.photos/32/32?seed=${msg.sender?.name || msg.user}`}
                  className="w-8 h-8 rounded-full"
                  alt={msg.sender?.name || "User"}
                />

                <div className="text-sm">
                  <span className="font-bold mr-2">{msg.sender?.name || msg.user || "Unknown"}</span>

                  {msg.content || msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSendChat)} className="p-4 border-t flex gap-3 items-center">
            <input
              {...register("message", {
                required: true,
              })}
              className="flex-1 bg-gray-100 p-3 rounded-xl"
              placeholder="Type message..."
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FFC12D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e4b336]"
              disabled={isSending}
            >
              <Send size={16} />
              {isSending ? "Sending" : "Send"}
            </button>
          </form>
        </div> */}
      </div>

      {isEndModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-xl font-bold">End Stream</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter the reason for ending this stream.
                </p>
              </div>
              <button
                onClick={() => setIsEndModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <label className="font-semibold text-sm text-gray-700">
                Reason
              </label>
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
                type="button"
                onClick={() => setIsEndModalOpen(false)}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmEndStream}
            className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600"
              >
                {isEnding ? "Ending..." : "Confirm End Stream"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isWarningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-xl font-bold">Give Warning</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Select a warning reason and provide a description.
                </p>
              </div>
              <button
                onClick={() => setIsWarningModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="font-semibold text-sm text-gray-700 block">
                  Warning reason
                </label>
                <select
                  value={warningType}
                  onChange={(e) => setWarningType(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-900 outline-none focus:border-[#FFC12D] focus:ring-2 focus:ring-[#FFC12D]/20"
                >
                  <option value="">Select a reason</option>
                  {warningReasonOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm text-gray-700 block">
                  Description
                </label>
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
                type="button"
                onClick={() => setIsWarningModalOpen(false)}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmGiveWarning}
                className="rounded-2xl bg-[#FFC12D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e4b336]"
              >
                {isWarninging ? "Sending..." : "Confirm Warning"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreamView;
