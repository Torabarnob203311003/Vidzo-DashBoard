import React from "react";
import { NavLink } from "react-router-dom";
import { 
    LayoutDashboard, Users, CheckSquare, DollarSign, 
    Radio, TrendingUp, Flag, Trophy, Store, 
    FolderTree, MessageSquare, MessageCircleQuestion, FileText,
    ChevronDown, X, UserCog, LogOut
} from "lucide-react";
import vidzo from "../assets/Vidzo.jpg";

export default function Sidebar({ user, handleLogout, isOpen, closeSidebar, openSections, toggleSection }) {
    const linkClass = ({ isActive }) =>
        "flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-colors " + 
        (isActive ? "bg-yellow-400 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-100");

    const sectionButtonClass = "flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors";

    const subLinkClass = ({ isActive }) =>
        "flex items-center gap-3 px-4 py-2 ml-6 text-sm rounded transition-colors " + 
        (isActive ? "bg-yellow-400 text-gray-900 font-medium" : "text-gray-600 hover:bg-gray-100");

    const handleLinkClick = () => {
        closeSidebar();
    };

    return (
        <aside className={` 
            fixed md:static inset-y-0 left-0 z-50
            w-64 bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            <div className="p-4  flex items-center justify-between">
                <div className="flex items-center gap-0">
                    <img src={vidzo} alt="VidZo" className="ms-8 w-32 h-28 -mb-6 " />
                    {/* <span className="text-lg font-bold text-gray-900">VidZo</span> */}
                </div>
                <button 
                    onClick={closeSidebar}
                    className="md:hidden text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="p-3  space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
                <NavLink 
                    to="/dashboard/overview" 
                    className={linkClass}
                    onClick={handleLinkClick}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Overview</span>
                </NavLink>

                <button 
                    className={sectionButtonClass}
                    onClick={() => toggleSection('users')}
                >
                    <div className="flex items-center gap-3">
                        <Users className="w-4 h-4" />
                        <span>User's</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSections.users ? 'rotate-180' : ''}`} />
                </button>
                
                {openSections.users && (
                    <div className="space-y-1">
                        <NavLink 
                            to="/dashboard/users/streamer-fans" 
                            className={subLinkClass}
                            onClick={handleLinkClick}
                        >
                            <span className="text-xs">•</span>
                            <span>Streamer & Fans</span>
                        </NavLink>
                        <NavLink 
                            to="/dashboard/users/business-users" 
                            className={subLinkClass}
                            onClick={handleLinkClick}
                        >
                            <span className="text-xs">•</span>
                            <span>Business Users</span>
                        </NavLink>
                    </div>
                )}

                <button 
                    className={sectionButtonClass}
                    onClick={() => toggleSection('approvals')}
                >
                    <div className="flex items-center gap-3">
                        <CheckSquare className="w-4 h-4" />
                        <span>Approvals</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSections.approvals ? 'rotate-180' : ''}`} />
                </button>

                {openSections.approvals && (
                    <div className="space-y-1">
                        <NavLink 
                            to="/dashboard/approvals/business-users" 
                            className={subLinkClass}
                            onClick={handleLinkClick}
                        >
                            <span className="text-xs">•</span>
                            <span>Business Users</span>
                        </NavLink>
                        <NavLink 
                            to="/dashboard/approvals/marketplace-item" 
                            className={subLinkClass}
                            onClick={handleLinkClick}
                        >
                            <span className="text-xs">•</span>
                            <span>Marketplace Item</span>
                        </NavLink>
                    </div>
                )}

                <NavLink to="/dashboard/earnings" className={linkClass} onClick={handleLinkClick}>
                    <DollarSign className="w-4 h-4" />
                    <span>Earnings</span>
                </NavLink>

                <NavLink to="/dashboard/live-monitoring" className={linkClass} onClick={handleLinkClick}>
                    <Radio className="w-4 h-4" />
                    <span>Live Monitoring</span>
                </NavLink>

                <NavLink to="/dashboard/top-performers" className={linkClass} onClick={handleLinkClick}>
                    <TrendingUp className="w-4 h-4" />
                    <span>Top Performers</span>
                </NavLink>

                <NavLink to="/dashboard/report-monitoring" className={linkClass} onClick={handleLinkClick}>
                    <Flag className="w-4 h-4" />
                    <span>Report Monitoring</span>
                </NavLink>

                <NavLink to="/dashboard/challenges" className={linkClass} onClick={handleLinkClick}>
                    <Trophy className="w-4 h-4" />
                    <span>Challenges</span>
                </NavLink>

                <NavLink to="/dashboard/marketplace" className={linkClass} onClick={handleLinkClick}>
                    <Store className="w-4 h-4" />
                    <span>Marketplace</span>
                </NavLink>

                <NavLink to="/dashboard/categories" className={linkClass} onClick={handleLinkClick}>
                    <FolderTree className="w-4 h-4" />
                    <span>Categories</span>
                </NavLink>

                <NavLink to="/dashboard/messages" className={linkClass} onClick={handleLinkClick}>
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                </NavLink>

                <NavLink to="/dashboard/feedback" className={linkClass} onClick={handleLinkClick}>
                    <MessageCircleQuestion className="w-4 h-4" />
                    <span>Feedback</span>
                </NavLink>

                <button 
                    className={sectionButtonClass}
                    onClick={() => toggleSection('documentation')}
                >
                    <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4" />
                        <span>Documentation</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSections.documentation ? 'rotate-180' : ''}`} />
                </button>

                {openSections.documentation && (
                    <div className="space-y-1">
                        <NavLink to="/dashboard/docs/faq" className={subLinkClass} onClick={handleLinkClick}>
                            <span className="text-xs">•</span>
                            <span>FAQ</span>
                        </NavLink>
                        <NavLink to="/dashboard/docs/privacy-policy" className={subLinkClass} onClick={handleLinkClick}>
                            <span className="text-xs">•</span>
                            <span>Privacy Policy</span>
                        </NavLink>
                        <NavLink to="/dashboard/docs/terms" className={subLinkClass} onClick={handleLinkClick}>
                            <span className="text-xs">•</span>
                            <span>Terms of Service</span>
                        </NavLink>
                        <NavLink to="/dashboard/docs/about" className={subLinkClass} onClick={handleLinkClick}>
                            <span className="text-xs">•</span>
                            <span>About Us</span>
                        </NavLink>
                    </div>
                )}

                <NavLink to="/dashboard/profile-settings" className={linkClass} onClick={handleLinkClick}>
                    <UserCog className="w-4 h-4" />
                    <span>Profile Settings</span>
                </NavLink>

                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded text-gray-700 hover:bg-gray-100 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                </button>
            </nav>
        </aside>
    );
}