

import { Plus, Edit2, Trash2 } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      q: "How can I start a live stream?",
      a: "To start a live stream, tap the \"Go Live\" button on the main screen or navigation menu. Enter your stream details like title, category, description, and any tags, then hit submit. Viewers will start joining in shortly!"
    },
    {
      q: "How can I join a live stream?",
      a: "To join a live stream, head to the live streams section. Browse through the available streams and click on the one you want to watch. Make sure your device is ready for streaming!"
    },
    {
      q: "How can I check my streaming stats?",
      a: "To check your streaming stats, go to the \"My Streams\" tab. Here, you can view the performance of your streams along with viewer interactions and comments. Regularly checking these stats will help you improve!"
    },
    {
      q: "How can I interact with viewers during a live stream?",
      a: "To interact with viewers during a live stream, access the live chat feature. You can send and receive messages in real-time to engage with your audience and answer their questions."
    }
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Frequently Asked Questions</h2>
        <button className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all">
          <Plus size={22} /> Add New FAQ
        </button>
      </div>

      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-[#1E293B] mb-4">{f.q}</h3>
            <p className="text-gray-500 font-bold leading-relaxed mb-6">{f.a}</p>
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
              <button className="flex items-center gap-2 px-6 py-2 bg-white border border-yellow-400 text-yellow-500 rounded-lg text-sm font-black hover:bg-yellow-50 transition-colors">
                <Edit2 size={16} /> Edit
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-white border border-red-400 text-red-500 rounded-lg text-sm font-black hover:bg-red-50 transition-colors">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
