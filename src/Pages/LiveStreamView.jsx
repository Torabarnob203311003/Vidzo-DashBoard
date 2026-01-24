
import React from 'react';
import { ArrowLeft, Send, Ban, MoreVertical, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveStreamView = () => {
 const navigate = useNavigate();

  const chatMessages = [
    { id: 1, user: 'Misha', text: 'Joined', type: 'system' },
    { id: 2, user: 'Jack', text: 'Good Morning', type: 'user' },
    { id: 3, user: 'Anna', text: 'How was your weekend?', type: 'user' },
    { id: 4, user: 'Sam', text: 'Excited for the team meeting!', type: 'user' },
    { id: 5, user: 'Lila', text: 'I have a new project idea.', type: 'user' },
    { id: 6, user: 'Tom', text: 'Don\'t forget the deadline.', type: 'user' },
    { id: 7, user: 'Tom', text: 'Don\'t forget the deadline.', type: 'user' },
    { id: 8, user: 'Tom', text: 'Don\'t forget the deadline.', type: 'user' },
    { id: 9, user: 'Tom', text: 'Don\'t forget the deadline.', type: 'user' },
  ];

  return (
    <div className="p-10">
   <button
      onClick={() => navigate(-1)} // -1 goes back to the previous page
      className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-8 hover:text-[#FFC12D] transition-colors"
    >
      <ArrowLeft size={18} /> Back to dashboard
    </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-220px)]">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="relative flex-1 bg-black rounded-3xl overflow-hidden group">
            <img 
              src="https://picsum.photos/1200/800?seed=streamer" 
              className="w-full h-full object-cover" 
              alt="Live Stream" 
            />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-lg uppercase">Live</span>
              <span className="bg-black/40 backdrop-blur-md text-white px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1">
                <Eye size={14} /> 7.4K
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-4">
               <h1 className="text-2xl font-bold text-gray-900 leading-tight">IRL Stream | Streaming from Las Vegas | Doing QA Sessions</h1>
               <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/48/48?seed=streamer" className="w-12 h-12 rounded-full" alt="Streamer" />
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-900">Graham Jackson</span>
                    <span className="text-xs font-medium text-gray-400">10K Followers</span>
                  </div>
               </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-yellow-400 text-white font-bold rounded-xl hover:bg-yellow-500 transition-colors">
                Give Warning
              </button>
              <button className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors">
                End Broadcast
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-center">
            <h3 className="text-lg font-bold text-gray-800">Live Chat</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between group p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/32/32?seed=${msg.user}`} className="w-8 h-8 rounded-full" alt="" />
                  <div className="text-sm">
                    <span className={`font-bold mr-1 ${msg.user === 'Misha' ? 'text-blue-500' : 'text-gray-800'}`}>{msg.user}</span>
                    <span className="text-gray-600">{msg.text}</span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all">
                  <Ban size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full bg-gray-50 border-none rounded-2xl pl-5 pr-12 py-3.5 text-sm focus:ring-0"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition-colors">
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-3 font-medium">Chatting as Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamView;
