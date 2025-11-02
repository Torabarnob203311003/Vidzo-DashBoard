import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import vidzo from "../assets/Vidzo.jpg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const normalizedEmail = (email || "").trim().toLowerCase();
        const enteredPassword = (password || "").trim();

        const users = JSON.parse(localStorage.getItem("vd_users") || "{}");
        const userRecord = users[normalizedEmail];
        if (!userRecord || userRecord.password !== enteredPassword) {
            return setError("Invalid credentials");
        }
        login(normalizedEmail);
        navigate("/dashboard/overview");
    };

    // create account quickly from login form (no separate signup page)
    const handleQuickSignup = () => {
        setError("");
        const normalizedEmail = (email || "").trim().toLowerCase();
        const enteredPassword = (password || "").trim();

        if (!normalizedEmail || !enteredPassword) {
            return setError("Enter email and password to create account");
        }
        if (enteredPassword.length < 4) {
            return setError("Password must be at least 4 characters");
        }

        const users = JSON.parse(localStorage.getItem("vd_users") || "{}");
        users[normalizedEmail] = { password: enteredPassword };
        localStorage.setItem("vd_users", JSON.stringify(users));

        login(normalizedEmail);
        navigate("/dashboard/overview");
    };

    // For development: create a test user if none exists
    React.useEffect(() => {
        const users = JSON.parse(localStorage.getItem("vd_users") || "{}");
        if (!users["test@example.com"]) {
            users["test@example.com"] = { password: "1234" };
            localStorage.setItem("vd_users", JSON.stringify(users));
            console.log("created test user", users);
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-0">
                    <div className="flex items-center gap-2">
                        <img src={vidzo} alt="VidZo" className="w-56 h-56 object-contain" />
                      
                    </div>
                </div>

                {/* Sign In Title */}
                <h2 className="text-2xl font-semibold text-center mb-8 text-yellow-500">
                    Sign in Your Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        Sign In
                    </button>

                    {/* Forgot Password & Create Account Links */}
                    <div className="text-center flex flex-col items-center gap-2">
                        <button
                            type="button"
                            onClick={() => navigate("/forgot")}
                            className="text-sm text-gray-700 hover:text-gray-900"
                        >
                            Forgot the password?
                        </button>

                        {/* Create account uses same styling as existing link (no style changes) */}
                        {/* <button
                            type="button"
                            onClick={handleQuickSignup}
                            className="text-sm text-gray-700 hover:text-gray-900"
                        >
                            Create account
                        </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}