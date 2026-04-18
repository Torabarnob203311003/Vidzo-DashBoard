import React, { useRef, useState } from "react";
import { Camera, Lock, EyeOff, User, Mail, Eye, Save } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileApi";
import Loader from "@/Components/shared/Loader";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isPasswordLoading }] =
    useChangePasswordMutation();
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset,
  } = useForm();

  if (isLoading || isUpdating || isPasswordLoading) {
    return <Loader></Loader>;
  }
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Register the file with react-hook-form
      setValue("image", file);
    }
  };
  const handleProfileUpdate = async (data) => {
    const formData = new FormData();

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    if (data.name) {
      formData.append("name", data.name); // ✅ FIXED
    }
    if (data.userName) {
      formData.append("userName", data.userName); // ✅ FIXED
    }
    if (data.email) {
      formData.append("email", data.email); // ✅ FIXED
    }

    try {
      const res = await updateProfile(formData);
      console.log(res);

      if (res?.error) {
        return toast.error(res.error.data?.message || "Profile Update failed");
      }
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleChangePassword = async (data) => {
    try {
      const res = await changePassword(data);
      if (res?.error) {
        return toast.error(res.error.data?.message || "Password Change failed");
      }
      if (res.data?.success) {
        toast.success(res.data.message);
        reset({
          currentPassword: "",
          confirmPassword: "",
          newPassword: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(data);
  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      <h2 className="text-3xl font-black text-[#1E293B] mb-10">
        Profile Settings
      </h2>

      <div className="bg-white p-2 rounded-2xl border border-gray-100 w-fit shadow-sm flex items-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeTab === "edit" ? "bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20" : "text-gray-500 hover:bg-gray-50"}`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeTab === "password" ? "bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20" : "text-gray-500 hover:bg-gray-50"}`}
        >
          Change Password
        </button>
      </div>

      {activeTab === "edit" ? (
        <form
          onSubmit={handleSubmit(handleProfileUpdate)}
          className="space-y-10 animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="relative w-32 h-32">
            <img
              src={
                previewImage ||
                data?.data?.image ||
                "https://picsum.photos/128/128?seed=admin"
              }
              className="w-full h-full rounded-[40px] object-cover"
              alt=""
            />
            <input
              type="file"
              {...register("image")}
              ref={(e) => {
                register("image").ref(e);
                fileInputRef.current = e;
              }}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImageClick}
              className="absolute -bottom-2 -right-2 p-2 bg-[#FFC12D] text-white rounded-xl border-4 border-white shadow-lg"
            >
              <Camera size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-xl">
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-800">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
                  size={18}
                />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  defaultValue={data?.data?.name || "Austin Mahoney"}
                  className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-6 py-4 text-sm font-bold text-gray-800 focus:ring-0"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-800">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
                  size={18}
                />
                <input
                  type="text"
                  {...register("userName", {
                    required: "Username is required",
                  })}
                  defaultValue={data?.data?.userName || ""}
                  className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-6 py-4 text-sm font-bold text-gray-800 focus:ring-0"
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-800">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
                  size={18}
                />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  defaultValue={data?.data?.email || ""}
                  className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-6 py-4 text-sm font-bold text-gray-800 focus:ring-0"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-3 rounded-xl text-xs font-black transition-all bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20 flex gap-2 items-center justify-center`}
              >
                <Save size={18} /> Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handlePasswordSubmit(handleChangePassword)}
          className="space-y-8 max-w-xl animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="space-y-2">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 "
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Current password"
                {...passwordRegister("currentPassword", {
                  required: "Password is required",
                })}
                className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-12 py-4 text-sm font-bold text-gray-800 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-sm mb-2 text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={18}
              />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                {...passwordRegister("newPassword", {
                  required: "New Password is required",
                })}
                className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-12 py-4 text-sm font-bold text-gray-800 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={18}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...passwordRegister("confirmPassword", {
                  required: "Password is required",
                })}
                className="w-full bg-[#F0F0F0] border-none rounded-xl pl-12 pr-12 py-4 text-sm font-bold text-gray-800 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20 flex gap-2 items-center justify-center`}
            >
              <Save size={18} /> Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSettings;
