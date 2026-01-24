import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
    // sidebar visible on desktop, hidden on small screens; no toggle behavior
    useState(() => true); // keep previous behavior; value not needed
    const [openSections, setOpenSections] = useState({
        users: false,
        approvals: false,
        documentation: false
    });

 
    // toggle/close functions removed — sidebar is static on desktop

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar 
               
          
                openSections={openSections}
                toggleSection={toggleSection}
            />

            {/* no overlay/toggle behavior — sidebar is static on desktop */}

            <div className="flex-1 flex flex-col">
                <Header 
                 
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