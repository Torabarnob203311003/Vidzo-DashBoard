import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
    const { logout, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

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
                isOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
                openSections={openSections}
                toggleSection={toggleSection}
            />

            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            <div className="flex-1 flex flex-col">
                <Header 
                    handleLogout={handleLogout} 
                    toggleSidebar={toggleSidebar}
                />

                <main className="p-6">
                    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-sm">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}