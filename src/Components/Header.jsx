import React from "react";
import { Menu, Bell } from "lucide-react";

export default function Header({ handleLogout, toggleSidebar }) {
    return (
        <header className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
                {/* <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2> */}
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center gap-3 bg-gray-200 px-10 py-2 rounded-full shadow-sm border border-gray-100">
                    {/* <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-semibold text-gray-900">
                        A
                    </div> */}
                    <div className="text-left">
                        <div className="text-sm font-medium text-gray-800">Austin Mahoney</div>
                        <div className="text-xs text-gray-500">Admin</div>
                    </div>
                </div>

                {/* <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors text-sm"
                >
                    Logout
                </button> */}
            </div>
        </header>
    );
}