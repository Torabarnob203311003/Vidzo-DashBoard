import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        // Your OTP logic here
        console.log("Forgot password for:", email);
    };

    const handleBackToLogin = () => {
        // Navigate back to login
        console.log("Back to login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-2 text-yellow-500">
                    Forgot password?
                </h2>
                
                {/* Subtitle */}
                <p className="text-center text-sm text-gray-500 mb-8">
                    No worries, we'll send you reset instructions.
                </p>

                {/* Form */}
                <div className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Name"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {msg && (
                        <div className="text-sm text-red-600 text-center">
                            {msg}
                        </div>
                    )}

                    {/* Send OTP Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        Send OTP
                    </button>

                    {/* Back to Login Link */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleBackToLogin}
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} />
                            Back to login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}