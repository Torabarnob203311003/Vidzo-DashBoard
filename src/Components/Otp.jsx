/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setResendOtpEmail,
  setResetToken,
} from "@/redux/features/auth/authSlice";

export default function OTPVerification() {
  const resendOtpEmail = useSelector((state) => state.auth.otpEmail);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOPT, { isLoading: OTPLoading }] = useResendOTPMutation();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.match(/\d/g) || [];

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setMessage("Please enter complete OTP");
      return;
    }
    if (!resendOtpEmail) {
      toast.error("Something went wrong");
      navigate("/login");
      return;
    }
    try {
      const res = await verifyOTP({
        email: resendOtpEmail,
        oneTimeCode: parseInt(otpValue),
      });

      // Error
      if (res?.error) {
        return toast.error(res.error.data?.message || "Login failed");
      }

      // Success
      if (res.data?.success) {
        toast.success(res.data.message);
        dispatch(setResetToken(res.data.data.resetToken));
        navigate("/reset-password");
        setOtp(["", "", "", "", "", ""]);
        dispatch(setResendOtpEmail(null));
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleResend = async () => {
    if (!resendOtpEmail) return toast.error("Email is required");
    try {
      const data = { email: resendOtpEmail };
      const res = await resendOPT(data);

      // Error
      if (res?.error) {
        return toast.error(res.error.data?.message || "Resend failed");
      }

      // Success
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleBackToLogin = () => {
    setMessage("Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-3 text-yellow-500">
          Check your email
        </h2>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-500 mb-10">
          We sent a verification link to
          <br />
          your contact email
        </p>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-3xl font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
            />
          ))}
        </div>

        {/* Message Display */}
        {message && (
          <div className="text-center mb-4 text-sm text-gray-700">
            {message}
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors duration-200 mb-4"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend Link */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-600">
            Didn't receive the email?{" "}
          </span>
          <button
            onClick={handleResend}
            className="text-sm text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Click to resend
          </button>
        </div>

        {/* Back to Login Link */}
        <div className="text-center">
          <button
            onClick={handleBackToLogin}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to log in
          </button>
        </div>
      </div>
    </div>
  );
}
