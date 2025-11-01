import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Otp() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");
    const emailFromState = state?.email;

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        const stored = JSON.parse(localStorage.getItem("vd_reset") || "null");
        if (!stored) return setMsg("No OTP request found");
        if (Date.now() > stored.expires) return setMsg("OTP expired");
        if (stored.otp !== otp) return setMsg("Invalid OTP");
        navigate("/reset-password", { state: { email: stored.email } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4 text-center">Enter OTP</h2>
                <p className="text-sm text-gray-600 text-center mb-3">Check console for demo OTP. Email: {emailFromState || "—"}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">OTP</label>
                        <input
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    {msg && <div className="text-sm text-red-600">{msg}</div>}
                    <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Verify OTP</button>
                </form>
            </div>
        </div>
    );
}