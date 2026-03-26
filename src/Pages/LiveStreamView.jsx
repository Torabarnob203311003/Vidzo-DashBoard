import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Ban, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "@/Components/shared/Loader";
import { toast } from "sonner";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useEndStreamMutation, useGetStreamByIdQuery, useGiveWarningMutation, useSendChatMessageMutation } from "@/redux/features/streams/streamsApi";


const LiveStreamView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: streamData, isLoading } = useGetStreamByIdQuery(id);
  const [sendMessage, { isLoading: isSending }] = useSendChatMessageMutation();
  const [endStream, { isLoading: isEnding }] = useEndStreamMutation();
  const [giveWarning, { isLoading: isWarninging }] = useGiveWarningMutation();

  const [chatMessages, setChatMessages] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const videoContainerRef = useRef(null);
  const agoraClientRef = useRef(null);
  const agoraLocalTrackRef = useRef({ videoTrack: null, audioTrack: null });

  const stream = streamData?.data?.streams[0];

  // Initialize Agora when stream data is available
  useEffect(() => {
    if (!stream?.agora) return;

    const initAgora = async () => {
      try {
        const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
        agoraClientRef.current = client;

        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;
            const playerContainer = document.createElement("div");
            playerContainer.id = user.uid;
            playerContainer.style.width = "100%";
            playerContainer.style.height = "100%";
            videoContainerRef.current.appendChild(playerContainer);
            remoteVideoTrack.play(playerContainer);
          }
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
          }
        });

        // Join the channel
        await client.join(
          stream.agora.appId,
          stream.agora.channelName,
          stream.agora.token,
          stream.agora.uid,
        );

        // If you want to publish local admin video/audio (optional)
        // const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        // agoraLocalTrackRef.current.audioTrack = microphoneTrack;
        // agoraLocalTrackRef.current.videoTrack = cameraTrack;
        // await client.publish([microphoneTrack, cameraTrack]);
      } catch (err) {
        console.error("Agora init error:", err);
        toast.error("Failed to join live stream");
      }
    };

    initAgora();

    return () => {
      // Clean up Agora client on unmount
      const cleanup = async () => {
        try {
          if (agoraLocalTrackRef.current.audioTrack)
            await agoraLocalTrackRef.current.audioTrack.stop();
          if (agoraLocalTrackRef.current.videoTrack)
            await agoraLocalTrackRef.current.videoTrack.stop();
          await agoraClientRef.current?.leave();
          agoraClientRef.current = null;
        } catch (err) {
          console.error("Agora cleanup error:", err);
        }
      };
      cleanup();
    };
  }, [stream]);

  // Send chat message
  const onSendChat = async (data) => {
    try {
      const res = await sendMessage({ streamId: id, message: data.message });
      if (res?.error)
        return toast.error(res.error.data?.message || "Failed to send message");
      if (res.data?.success) {
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now(), user: "Admin", text: data.message },
        ]);
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEndStream = async () => {
    try {
      const res = await endStream(id);
      if (res?.error)
        return toast.error(res.error.data?.message || "Failed to end stream");
      if (res.data?.success) {
        toast.success(res.data.message);
        navigate("/dashboard/live-monitoring");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGiveWarning = async () => {
    try {
      const res = await giveWarning(id);
      if (res?.error)
        return toast.error(res.error.data?.message || "Failed to give warning");
      if (res.data?.success) toast.success(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <button
        onClick={() => navigate("/dashboard/live-monitoring")}
        className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-8 hover:text-[#FFC12D] transition-colors"
      >
        <ArrowLeft size={18} /> Back to dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-220px)]">
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Stream Video */}
          <div
            ref={videoContainerRef}
            className="relative flex-1 bg-black rounded-3xl overflow-hidden group"
          >
            {!stream?.agora && (
              <img
                src={
                  stream?.banner ||
                  "https://picsum.photos/1200/800?seed=streamer"
                }
                className="w-full h-full object-cover"
                alt="Live Stream"
              />
            )}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-lg uppercase">
                Live
              </span>
              <span className="bg-black/40 backdrop-blur-md text-white px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1">
                <Eye size={14} /> {stream?.currentViewerCount || 0}
              </span>
            </div>
          </div>

          {/* Stream Info */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {stream?.title}
              </h1>
              <div className="flex items-center gap-3">
                <img
                  src={
                    stream?.streamer?.image ||
                    "https://picsum.photos/48/48?seed=streamer"
                  }
                  className="w-12 h-12 rounded-full"
                  alt="Streamer"
                />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900">
                    {stream?.streamer?.name}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    Followers: N/A
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleGiveWarning}
                disabled={isWarninging}
                className="px-6 py-2.5 bg-yellow-400 text-white font-bold rounded-xl hover:bg-yellow-500 transition-colors"
              >
                Give Warning
              </button>
              <button
                onClick={handleEndStream}
                disabled={isEnding}
                className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
              >
                End Broadcast
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-center">
            <h3 className="text-lg font-bold text-gray-800">Live Chat</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {stream?.chat?.length === 0 && chatMessages.length === 0 && (
              <p className="text-center text-gray-400">No chat messages yet.</p>
            )}
            {[...(stream?.chat || []), ...chatMessages].map((msg, index) => (
              <div
                key={index}
                className="flex items-center justify-between group p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://picsum.photos/32/32?seed=${msg.user || "user"}`}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div className="text-sm">
                    <span
                      className={`font-bold mr-1 ${msg.user === "Admin" ? "text-blue-500" : "text-gray-800"}`}
                    >
                      {msg.user}
                    </span>
                    <span className="text-gray-600">{msg.text}</span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all">
                  <Ban size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit(onSendChat)}
            className="p-4 bg-white border-t border-gray-50"
          >
            <div className="relative">
              <input
                {...register("message", {
                  required: "Message cannot be empty",
                })}
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-50 border-none rounded-2xl pl-5 pr-12 py-3.5 text-sm focus:ring-0"
              />
              <button
                type="submit"
                disabled={isSending}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            {errors.message && (
              <p className="text-red-500 mt-1 text-xs">
                {errors.message.message}
              </p>
            )}
            <p className="text-[10px] text-gray-400 text-center mt-3 font-medium">
              Chatting as Admin
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamView;
