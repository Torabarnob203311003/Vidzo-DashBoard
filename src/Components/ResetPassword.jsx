/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

export default function ResetPassword() {
  const navigate = useNavigate();
const [resetPassword,{isLoading}] = useResetPasswordMutation()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword)
      return toast.error("Password are not match");
    try {
      const res = await resetPassword({newPassword: data.password,confirmPassword: data.confirmPassword});

      // Error
      if (res?.error) {
        return toast.error(res.error.data?.message || "Resend failed");
      }

      // Success
      if (res.data?.success) {
        toast.success(res.data.message);
        navigate('/login')
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm text-center space-y-6">
        <h2 className="text-2xl font-semibold text-yellow-500">
          Set new password
        </h2>

        <p className="text-sm text-gray-500">
          Your new password must be different to previously used passwords.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm text-left">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm text-left">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg"
          >
           {isLoading? "loading...":"Reset password"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 mx-auto"
        >
          <ArrowLeft size={16} />
          Back to login
        </button>
      </div>
    </div>
  );
}
