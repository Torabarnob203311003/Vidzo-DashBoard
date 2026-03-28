
import { X, Mail, MapPin } from "lucide-react";
import Loader from "@/Components/shared/Loader";
import { useGetUserDetailsQuery } from "@/redux/features/user/userApi";


export default function UserDetailsModal({ onClose, id }) {
  const { data: userDetails, isLoading } = useGetUserDetailsQuery(id);

console.log(userDetails)

 

  if (isLoading) {
    return <Loader />;
  }
 const user = userDetails?.data;
  if (!user) {
    return null;
  }

  const avatar = user?.image;
  const name = user?.name;
  const email = user?.email;
  const location = user?.location;
console.log(user)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Title + Close */}
        <div className="relative flex items-center justify-center pt-8 pb-2 px-8">
          <h2 className="text-2xl font-black text-[#1a1040] tracking-tight">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-red-500 hover:text-red-600 transition-colors"
            aria-label="Close"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mt-6 px-8">
          <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-md">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <div className="mt-5 text-center px-8">
          <p className="text-2xl font-black text-[#1a1040]">{name}</p>
        </div>

        {/* Info rows */}
        <div className="mt-6 px-8 pb-8 flex flex-col">
          {/* Email */}
          <div className="flex items-center justify-between py-5 border-b border-gray-100">
            <div className="flex items-center gap-3 text-[#1a1040] font-semibold text-base">
              <Mail size={20} strokeWidth={1.8} />
              <span>Email :</span>
            </div>
            <span className="text-[#1a1040] font-bold text-base">
              {email}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between py-5 border-b border-gray-100">
            <div className="flex items-center gap-3 text-[#1a1040] font-semibold text-base">
              <MapPin size={20} strokeWidth={1.8} />
              <span>Location :</span>
            </div>
            <span className="text-[#1a1040] font-bold text-base">
              {location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}