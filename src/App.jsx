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
import Overview from "./Components/Overview";
import Details from "./Components/Details";

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
                        <Route path="details" element={<Details />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
