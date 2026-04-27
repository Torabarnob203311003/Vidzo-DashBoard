import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  CircleDollarSign,
  Radio,
  Crown,
  MessageSquareWarning,
  Swords,
  Shapes,
  MessageSquare,
  MessageSquareHeart,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  X,
  Wallet,
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
  onNavigate,
  children,
}) => {
  return (
    <>
      {to ? (
        <NavLink
          to={to}
          onClick={onNavigate}
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

const Sidebar = ({ isMobileOpen = false, onCloseMobile }) => {
  const [openMenus, setOpenMenus] = React.useState({
    users: true,
    approvals: false,
    docs: false,
  });
  const dispatch = useDispatch();
  const closeMobile = () => onCloseMobile?.();
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div
      className={`w-64 h-full bg-white border-r border-gray-100 flex flex-col overflow-y-auto no-scrollbar fixed left-0 top-0 z-40 shadow-sm transform transition-transform duration-200 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="p-6 md:p-8 flex items-start justify-between">
        <div className="flex flex-col items-center gap-1">
          <img
            src={vidzo}
            alt="VidZo"
            className="w-24 h-16 sm:w-28 sm:h-20 object-contain"
          />
        </div>
        <button
          type="button"
          onClick={closeMobile}
          aria-label="Close sidebar"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-50 text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 pb-10">
        <SidebarItem
          icon={<LayoutGrid />}
          label="Overview"
          to="/dashboard/overview"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<Users />}
          label="Users"
          to="/dashboard/users"
          onNavigate={closeMobile}
        />
        {/* Users Section */}
        {/* <SidebarItem
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
        </SidebarItem> */}

        {/* Approvals Section */}
        {/* <SidebarItem
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
        </SidebarItem> */}

        {/* Other Links */}
        <SidebarItem
          icon={<CircleDollarSign />}
          label="Earnings"
          to="/dashboard/earnings"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<Wallet />}
          label="Subscriptions"
          to="/dashboard/subscriptions"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<Radio />}
          label="Live Monitoring"
          to="/dashboard/live-monitoring"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<Crown />}
          label="Top Performers"
          to="/dashboard/top-performers"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<MessageSquareWarning />}
          label="Report Monitoring"
          to="/dashboard/report-monitoring"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<Swords />}
          label="Challenges"
          to="/dashboard/challenges"
          onNavigate={closeMobile}
        />
        {/* <SidebarItem
          icon={<ShoppingBag />}
          label="Marketplace"
          to="/dashboard/marketplace"
        /> */}
        <SidebarItem
          icon={<Shapes />}
          label="Categories"
          to="/dashboard/categories"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<MessageSquare />}
          label="Messages"
          to="/dashboard/messages"
          onNavigate={closeMobile}
        />
        <SidebarItem
          icon={<MessageSquareHeart />}
          label="Feedback"
          to="/dashboard/feedback"
          onNavigate={closeMobile}
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
                onNavigate={closeMobile}
              />
              <SidebarItem
                icon={<div />}
                label="Privacy Policy"
                to="/dashboard/docs/privacy-policy"
                onNavigate={closeMobile}
              />
              <SidebarItem
                icon={<div />}
                label="Terms of Service"
                to="/dashboard/docs/terms"
                onNavigate={closeMobile}
              />
              <SidebarItem
                icon={<div />}
                label="About Us"
                to="/dashboard/docs/about"
                onNavigate={closeMobile}
              />
            </div>
          )}
        </SidebarItem>

        <SidebarItem
          icon={<Settings />}
          label="Profile Settings"
          to="/dashboard/profile-settings"
          onNavigate={closeMobile}
        />

        {/* Logout */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <SidebarItem
            icon={<LogOut />}
            label="Log Out"
            onClick={() => {
              dispatch(logOut());
              closeMobile();
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
