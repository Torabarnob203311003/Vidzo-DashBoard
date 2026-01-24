import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  FileCheck,
  CircleDollarSign,
  Radio,
  Crown,
  MessageSquareWarning,
  Swords,
  ShoppingBag,
  Shapes,
  MessageSquare,
  MessageSquareHeart,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import vidzo from "../assets/Vidzo.jpg";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";

const SidebarItem = ({
  icon,
  label,
  to,
  hasSubmenu,
  isOpen,
  onClick,
  children,
}) => {
  return (
    <>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex items-center justify-between px-6 py-3 rounded-xl mx-4 cursor-pointer transition-all duration-200 ${
              isActive
                ? "bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20"
                : "text-[#64748B] hover:text-[#FFC12D] hover:bg-yellow-50"
            }`
          }
        >
          <div className="flex items-center gap-3">
            {React.cloneElement(icon, { size: 20 })}
            <span className="font-semibold text-[14px]">{label}</span>
          </div>
        </NavLink>
      ) : (
        <div
          className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-all duration-200 group text-[#64748B] hover:text-[#FFC12D] hover:bg-yellow-50 rounded-xl mx-4`}
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            {React.cloneElement(icon, { size: 20 })}
            <span className="font-semibold text-[14px]">{label}</span>
          </div>
          {hasSubmenu && (
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>
      )}
      {children}
    </>
  );
};

const Sidebar = () => {
  const [openMenus, setOpenMenus] = React.useState({
    users: true,
    approvals: false,
    docs: false,
  });
  const dispatch = useDispatch();
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col overflow-y-auto no-scrollbar fixed left-0 top-0 z-40 shadow-sm">
      <div className="p-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-1 mb-6">
          <img src={vidzo} alt="VidZo" className="w-16 h-16 object-contain" />
          <div className="text-center mt-2">
            <h1 className="text-2xl font-black text-[#1E293B] tracking-tight leading-none">
              VidZo
            </h1>
            <span className="text-[9px] uppercase font-bold text-[#FFC12D] tracking-[0.2em] block">
              Streaming
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 pb-10">
        <SidebarItem
          icon={<LayoutGrid />}
          label="Overview"
          to="/dashboard/overview"
        />

        {/* Users Section */}
        <SidebarItem
          icon={<Users />}
          label="User's"
          hasSubmenu
          isOpen={openMenus.users}
          onClick={() => toggleMenu("users")}
        >
          {openMenus.users && (
            <div className="ml-10 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1">
              <SidebarItem
                icon={<div />}
                label="Streamer & Fans"
                to="/dashboard/users/streamer-fans"
              />
              <SidebarItem
                icon={<div />}
                label="Business Users"
                to="/dashboard/users/business-users"
              />
            </div>
          )}
        </SidebarItem>

        {/* Approvals Section */}
        <SidebarItem
          icon={<FileCheck />}
          label="Approvals"
          hasSubmenu
          isOpen={openMenus.approvals}
          onClick={() => toggleMenu("approvals")}
        >
          {openMenus.approvals && (
            <div className="ml-10 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1">
              <SidebarItem
                icon={<div />}
                label="Business Users"
                to="/dashboard/approvals/business-users"
              />
              <SidebarItem
                icon={<div />}
                label="Marketplace Item"
                to="/dashboard/approvals/marketplace-item"
              />
            </div>
          )}
        </SidebarItem>

        {/* Other Links */}
        <SidebarItem
          icon={<CircleDollarSign />}
          label="Earnings"
          to="/dashboard/earnings"
        />
        <SidebarItem
          icon={<Radio />}
          label="Live Monitoring"
          to="/dashboard/live-monitoring"
        />
        <SidebarItem
          icon={<Crown />}
          label="Top Performers"
          to="/dashboard/top-performers"
        />
        <SidebarItem
          icon={<MessageSquareWarning />}
          label="Report Monitoring"
          to="/dashboard/report-monitoring"
        />
        <SidebarItem
          icon={<Swords />}
          label="Challenges"
          to="/dashboard/challenges"
        />
        <SidebarItem
          icon={<ShoppingBag />}
          label="Marketplace"
          to="/dashboard/marketplace"
        />
        <SidebarItem
          icon={<Shapes />}
          label="Categories"
          to="/dashboard/categories"
        />
        <SidebarItem
          icon={<MessageSquare />}
          label="Messages"
          to="/dashboard/messages"
        />
        <SidebarItem
          icon={<MessageSquareHeart />}
          label="Feedback"
          to="/dashboard/feedback"
        />

        {/* Documentation Section */}
        <SidebarItem
          icon={<FileText />}
          label="Documentation"
          hasSubmenu
          isOpen={openMenus.docs}
          onClick={() => toggleMenu("docs")}
        >
          {openMenus.docs && (
            <div className="ml-10 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1">
              <SidebarItem
                icon={<div />}
                label="FAQ"
                to="/dashboard/docs/faq"
              />
              <SidebarItem
                icon={<div />}
                label="Privacy Policy"
                to="/dashboard/docs/privacy-policy"
              />
              <SidebarItem
                icon={<div />}
                label="Terms of Service"
                to="/dashboard/docs/terms"
              />
              <SidebarItem
                icon={<div />}
                label="About Us"
                to="/dashboard/docs/about"
              />
            </div>
          )}
        </SidebarItem>

        <SidebarItem
          icon={<Settings />}
          label="Profile Settings"
          to="/dashboard/profile-settings"
        />

        {/* Logout */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <SidebarItem
            icon={<LogOut />}
            label="Log Out"
            onClick={() => dispatch(logOut())}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
