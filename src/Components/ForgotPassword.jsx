/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setResendOtpEmail } from "@/redux/features/auth/authSlice";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email.trim();
    if (!email) return toast.error("Email is required");
    try {
      const res = await forgetPassword(data);

      // Error
      if (res?.error) {
        return toast.error(res.error.data?.message || "Login failed");
      }

      // Success
      if (res.data?.success) {
        dispatch(setResendOtpEmail(data.email))
        toast.success(res.data.message);

        navigate("/otp");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors duration-200"
          >
         {isLoading ? "Loading..." : "Send OTP"}  
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
        </form>
      </div>
    </div>
  );
}
