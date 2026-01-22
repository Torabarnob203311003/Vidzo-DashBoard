/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import vidzo from "../assets/Vidzo.jpg";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

import { useLoginMutation } from "../redux/features/auth/authApi";
import { storToken, storUserData } from "../redux/features/auth/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  // RTK Query
  const [loginUser, { isLoading }] = useLoginMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      // Error
      if (res?.error) {
        return toast.error(res.error.data?.message || "Login failed");
      }

      // Success
      if (res.data?.success) {
        toast.success(res.data.message);

        const token = res.data.data.accessToken;
        localStorage.setItem("accessToken", token);

        const decoded = jwtDecode(token);
        const { exp, iat, ...userData } = decoded;

        dispatch(storToken(token));
        dispatch(storUserData(userData));

        navigate("/dashboard/overview");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-0">
          <div className="flex items-center gap-2">
            <img src={vidzo} alt="VidZo" className="w-56 h-56 object-contain" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-8 text-yellow-500">
          Sign in Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Links */}
          <div className="text-center flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/forgot")}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Forgot the password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
