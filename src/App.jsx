import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth, RedirectIfAuth } from "./Components/PrivateRoute";
// import SignUp from "./Components/SignUp"; // removed signup because you don't have it
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Otp from "./Components/Otp";
import ResetPassword from "./Components/ResetPassword";
import DashboardLayout from "./Components/DashboardLayout";
import Overview from "./Pages/Overview";
import UsersStreamerFans from "./Pages/UsersStreamerFans";
import UsersBusiness from "./Pages/UsersBusiness";
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
import DocsFaq from "./Pages/DocsFaq";
import DocsPrivacy from "./Pages/DocsPrivacy";
import DocsTerms from "./Pages/DocsTerms";
import DocsAbout from "./Pages/DocsAbout";
import ProfileSettings from "./Pages/ProfileSettings";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    {/* signup route removed */}
                    <Route path="/login" element={<RedirectIfAuth><Login /></RedirectIfAuth>} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/dashboard" element={
                        <RequireAuth>
                            <DashboardLayout />
                        </RequireAuth>
                    }>
                        <Route index element={<Overview />} />
                        <Route path="overview" element={<Overview />} />

                        <Route path="users/streamer-fans" element={<UsersStreamerFans />} />
                        <Route path="users/business-users" element={<UsersBusiness />} />

                        <Route path="approvals/business-users" element={<ApprovalsBusiness />} />
                        <Route path="approvals/marketplace-item" element={<ApprovalsMarketplace />} />

                        <Route path="earnings" element={<Earnings />} />
                        <Route path="live-monitoring" element={<LiveMonitoring />} />
                        <Route path="top-performers" element={<TopPerformers />} />
                        <Route path="report-monitoring" element={<ReportMonitoring />} />
                        <Route path="challenges" element={<Challenges />} />
                        <Route path="marketplace" element={<Marketplace />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="feedback" element={<Feedback />} />

                        <Route path="docs/faq" element={<DocsFaq />} />
                        <Route path="docs/privacy-policy" element={<DocsPrivacy />} />
                        <Route path="docs/terms" element={<DocsTerms />} />
                        <Route path="docs/about" element={<DocsAbout />} />

                        <Route path="profile-settings" element={<ProfileSettings />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
