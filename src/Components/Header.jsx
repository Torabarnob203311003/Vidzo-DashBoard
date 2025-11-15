import React from "react";
import { Bell } from "lucide-react";

export default function Header({ handleLogout }) {
    return (
        <header className="fixed top-0 left-4 right-0 z-40 bg-white border-b border-gray-200 h-16">
            <div className="h-16 flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    {/* sidebar toggle removed */}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="flex items-center gap-3 bg-gray-200 px-4 py-1 rounded-full shadow-sm border border-gray-100">
                        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-semibold text-gray-900">
                            A
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-medium text-gray-800">Austin Mahoney</div>
                            <div className="text-xs text-gray-500">Admin</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}