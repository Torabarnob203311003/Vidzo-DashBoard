import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
    const { logout, user } = useAuth();
    // sidebar visible on desktop, hidden on small screens; no toggle behavior
    useState(() => true); // keep previous behavior; value not needed
    const [openSections, setOpenSections] = useState({
        users: false,
        approvals: false,
        documentation: false
    });

    const handleLogout = () => {
        logout();
        // navigate is handled by parent route or caller; keep previous behaviour
        // if you need automatic navigate here, import useNavigate and call navigate("/login")
    };

    // toggle/close functions removed — sidebar is static on desktop

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar 
                user={user} 
                handleLogout={handleLogout} 
                openSections={openSections}
                toggleSection={toggleSection}
            />

            {/* no overlay/toggle behavior — sidebar is static on desktop */}

            <div className="flex-1 flex flex-col">
                <Header 
                    handleLogout={handleLogout} 
                />

                <main className="mt-16 md:ml-64 h-[calc(100vh-4rem)] overflow-auto p-6">
                    <div className="w-full min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}