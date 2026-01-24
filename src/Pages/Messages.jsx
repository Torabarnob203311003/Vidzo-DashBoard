
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Messages = () => {
  const contacts = [
    { name: 'Florencio Dorrance', time: '24m', text: 'woohoooo', avatar: 'https://picsum.photos/48/48?1', active: true },
    { name: 'Elmer Laverty', time: '12m', text: 'Haha oh man 🔥', avatar: 'https://picsum.photos/48/48?2' },
    { name: 'Lavern Laboy', time: '1h', text: "Haha that's terrifying 😂", avatar: 'https://picsum.photos/48/48?3' },
    { name: 'Titus Kitamura', time: '5h', text: 'omg, this is amazing', avatar: 'https://picsum.photos/48/48?4' },
    { name: 'Geoffrey Mott', time: '2d', text: 'aww 😍', avatar: 'https://picsum.photos/48/48?5' },
    { name: 'Alfonzo Schuessler', time: '1m', text: 'perfect!', avatar: 'https://picsum.photos/48/48?6' },
    { name: 'Milton Follis', time: '3h', text: 'Incredible work!', avatar: 'https://picsum.photos/48/48?7' },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white no-scrollbar">
      {/* Contact List */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-2xl font-black text-[#1E293B]">Messages</h2>
            <ChevronDown size={20} className="text-gray-400" />
            <span className="bg-gray-100 text-gray-900 text-[11px] font-black px-2 py-0.5 rounded-md ml-auto">12</span>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#F0F0F0] border-none rounded-xl px-5 py-3.5 text-sm focus:ring-0 font-medium"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {contacts.map((contact, i) => (
            <div 
              key={i} 
              className={`px-8 py-5 rounded-xl flex items-center gap-4 cursor-pointer border-b border-gray-50/50 ${
                contact.active ? 'bg-[#FFC12D] text-white' : 'hover:bg-gray-50'
              }`}
            >
              <img src={contact.avatar} className="w-14 h-14 rounded-2xl object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-black text-[15px] truncate">{contact.name}</span>
                  <span className={`text-[11px] font-bold ${contact.active ? 'text-white' : 'text-gray-400'}`}>{contact.time}</span>
                </div>
                <p className={`text-xs truncate font-bold ${contact.active ? 'text-white/80' : 'text-gray-400'}`}>{contact.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="px-10 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://picsum.photos/48/48?1" className="w-12 h-12 rounded-2xl" alt="" />
            <div>
              <h3 className="font-black text-gray-900 text-lg">Florencio Dorrance</h3>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                <span className="text-[11px] font-bold text-gray-400">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-white ">
          <div className="flex flex-col gap-4 items-start max-w-2xl">
            <div className="bg-[#F0F0F0] text-gray-900 p-5 rounded-[24px] rounded-tl-none text-sm font-bold shadow-sm">
              omg, this is amazing
            </div>
            <div className="bg-[#F0F0F0] text-gray-900 p-5 rounded-[24px] rounded-tl-none text-sm font-bold shadow-sm">
              perfect! ✅
            </div>
            <div className="bg-[#F0F0F0] text-gray-900 p-5 rounded-[24px] rounded-tl-none text-sm font-bold shadow-sm">
              Wow, this is really epic
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
             <div className="flex items-end gap-3">
               <div className="bg-[#FFC12D] text-white p-5 rounded-[24px] rounded-br-none text-sm font-bold shadow-md">
                 How are you?
               </div>
               <img src="https://picsum.photos/32/32?seed=admin" className="w-8 h-8 rounded-xl" alt="" />
             </div>
          </div>

          <div className="flex flex-col gap-4 items-start max-w-2xl">
            <div className="bg-[#F0F0F0] text-gray-900 p-5 rounded-[24px] rounded-tl-none text-sm font-bold shadow-sm">
              just ideas for next time
            </div>
            <div className="bg-[#F0F0F0] text-gray-900 p-5 rounded-[24px] rounded-tl-none text-sm font-bold shadow-sm">
              I'll be there in 2 mins ⏰
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
