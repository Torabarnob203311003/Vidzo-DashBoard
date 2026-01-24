import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Otp from "./Components/Otp";
import ResetPassword from "./Components/ResetPassword";

// Dashboard Layout & Pages
import DashboardLayout from "./Components/DashboardLayout";
import UsersStreamerFans from "./Pages/UsersStreamerFans";
import ApprovalsBusiness from "./Pages/ApprovalsBusiness";
import ApprovalsMarketplace from "./Pages/ApprovalsMarketplace";
import Earnings from "./Pages/Earnings";
import LiveMonitoring from "./Pages/LiveMonitoring";
import TopPerformers from "./Pages/TopPerformers";
import ReportMonitoring from "./Pages/ReportMonitoring";
import Challenges from "./Pages/Challenges";
import Marketplace from "./Pages/Marketplace";
import Categories from "./Pages/Categories";
import Messages from "./Pages/Messages";
import Feedback from "./Pages/Feedback";
import ProfileSettings from "./Pages/ProfileSettings";
import PrivateRoute from "./Components/PrivateRoute";
import BusinessUsers from "./Pages/UsersBusiness";
import DashboardOverview from "./Pages/DashboardOverview";
import FAQ from "./Pages/FAQ";
import LiveStreamView from "./Pages/LiveStreamView";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";
import AboutUs from "./Pages/AboutUs";

// Auth Wrapper
 // Your auth check component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="overview" element={<DashboardOverview />} />

            {/* Users */}
            <Route path="users/streamer-fans" element={<UsersStreamerFans />} />
            <Route path="users/business-users" element={<BusinessUsers />} />

            {/* Approvals */}
            <Route path="approvals/business-users" element={<ApprovalsBusiness />} />
            <Route path="approvals/marketplace-item" element={<ApprovalsMarketplace />} />

            {/* Other Pages */}
            <Route path="earnings" element={<Earnings />} />
            <Route path="live-monitoring" element={<LiveMonitoring />} />
            <Route path="live-stream/:id" element={<LiveStreamView />} />
            <Route path="top-performers" element={<TopPerformers />} />
            <Route path="report-monitoring" element={<ReportMonitoring />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="categories" element={<Categories />} />
            <Route path="messages" element={<Messages />} />
            <Route path="feedback" element={<Feedback />} />

            {/* Docs */}
            <Route path="docs/faq" element={<FAQ />} />
            <Route path="docs/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="docs/terms" element={<TermsOfService />} />
            <Route path="docs/about" element={<AboutUs />} />

            {/* Profile */}
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
