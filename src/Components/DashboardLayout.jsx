import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        "block px-4 py-2 rounded hover:bg-indigo-50 " + (isActive ? "bg-indigo-100 font-semibold" : "text-gray-700");

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-bold">Vidzo Dashboard</h3>
                    <p className="text-sm text-gray-500">Hi, {user?.email || "User"}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <NavLink to="/dashboard/overview" className={linkClass}>Overview</NavLink>
                    <NavLink to="/dashboard/details" className={linkClass}>Details</NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between bg-white p-4 border-b">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden px-2 py-1 border rounded"
                            onClick={() => {
                                // simple fallback for small screens: navigate to overview
                                navigate("/dashboard/overview");
                            }}
                        >
                            Menu
                        </button>
                        <h2 className="text-xl font-semibold">Dashboard</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
                    </div>
                </header>

                {/* Content area */}
                <main className="p-6">
                    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-sm">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}