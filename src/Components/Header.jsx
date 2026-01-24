import React from 'react';
import { Bell, Search, X, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '@/redux/features/appSlice';

const Header = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.app.notifications);
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end px-10 fixed top-0 right-0 left-64 z-30">
      <div className="flex items-center gap-6 relative">
        <div 
          className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={24} className="text-gray-600" />
          {notifications.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </div>

        {showNotifications && (
          <div className="absolute top-14 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <span className="text-sm font-bold text-gray-800">Notifications</span>
              <button 
                onClick={() => dispatch(clearNotifications())}
                className="text-[10px] font-bold text-gray-400 hover:text-yellow-500 uppercase tracking-wider"
              >
                Clear All
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto no-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center">
                   <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-2">
                      <Check size={24} />
                   </div>
                   <p className="text-sm text-gray-400 font-medium">All caught up!</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3">
                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                      n.type === 'warning' ? 'bg-red-500' : n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-bold text-gray-800 leading-tight">{n.title}</p>
                      <span className="text-[10px] font-medium text-gray-400">{n.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-4 bg-gray-50 pl-4 pr-6 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-800">Austin Mahoney</span>
            <span className="text-[11px] font-medium text-gray-400">Admin</span>
          </div>
          <img 
            src="https://picsum.photos/40/40?seed=admin" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
