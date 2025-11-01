import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const email = state?.email;
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState("");

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p>No email context. Start flow from Forgot Password.</p>
                    <button onClick={() => navigate("/forgot")} className="mt-4 text-indigo-600">Go to Forgot</button>
                </div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        if (!password) return setMsg("Enter a password");
        if (password !== confirm) return setMsg("Passwords do not match");
        const users = JSON.parse(localStorage.getItem("vd_users") || "{}");
        if (!users[email]) return setMsg("No user found");
        users[email].password = password;
        localStorage.setItem("vd_users", JSON.stringify(users));
        localStorage.removeItem("vd_reset");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4 text-center">Set new password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">New password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm password</label>
                        <input
                            required
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    {msg && <div className="text-sm text-red-600">{msg}</div>}
                    <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Save password</button>
                </form>
            </div>
        </div>
    );
}