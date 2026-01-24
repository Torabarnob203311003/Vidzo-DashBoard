
import React, { useState } from 'react';
import { Camera, Lock, EyeOff, User, Mail } from 'lucide-react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] =useState('edit');

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <h2 className="text-3xl font-black text-[#1E293B] mb-10">Profile Settings</h2>

      <div className="bg-white p-2 rounded-2xl border border-gray-100 w-fit shadow-sm flex items-center gap-2 mb-10">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'edit' ? 'bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Edit Profile
        </button>
        <button 
          onClick={() => setActiveTab('password')}
          className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'password' ? 'bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Change Password
        </button>
      </div>

      {activeTab === 'edit' ? (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
          <div className="relative w-32 h-32">
            <img src="https://picsum.photos/128/128?seed=admin" className="w-full h-full rounded-[40px] object-cover" alt="" />
            <button className="absolute -bottom-2 -right-2 p-2 bg-[#FFC12D] text-white rounded-xl border-4 border-white shadow-lg">
              <Camera size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-xl">
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-800">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={18} />
                <input 
                  type="text" 
                  defaultValue="Austin Mahoney"
                  className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-6 py-4 text-sm font-bold text-gray-800 focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-800">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={18} />
                <input 
                  type="email" 
                  defaultValue="user@example.com"
                  className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-6 py-4 text-sm font-bold text-gray-800 focus:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 max-w-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-800">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={18} />
              <input 
                type="password" 
                placeholder="************"
                className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-12 py-4 text-sm font-bold text-gray-800 focus:ring-0"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                <EyeOff size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-800">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={18} />
              <input 
                type="password" 
                placeholder="************"
                className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-12 py-4 text-sm font-bold text-gray-800 focus:ring-0"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                <EyeOff size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-800">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={18} />
              <input 
                type="password" 
                placeholder="************"
                className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-12 py-4 text-sm font-bold text-gray-800 focus:ring-0"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                <EyeOff size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
