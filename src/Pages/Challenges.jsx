/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateChallengeMutation,
  useDeleteChallengeMutation,
  useGetChallengesQuery,
} from "@/redux/features/challenges/challengesApi";
import Pagination from "@/Components/shared/Pagination";

// ─── Constants ───────────────────────────────────────────────────────────────
const CHALLENGE_LEVELS = [
  { value: "common", label: "Common" },
  { value: "rare", label: "Rare" },
  { value: "epic", label: "Epic" },
  { value: "legendary", label: "Legendary" },
];
const CHALLENGE_TYPES = [
  { value: "send_gift", label: "Send Gift" },
  { value: "feather_gift", label: "Feather Gift" },
];
const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      {children}
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function AddChallengeModal({ onClose, onAdd }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

  const onSubmit = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-y-auto"
        style={{ maxHeight: "95vh" }}
      >
        <div className="flex items-center justify-between px-7 pt-7 pb-4">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Add New Challenges
          </h2>
          <button onClick={onClose} className="text-red-500">
            <X size={28} />
          </button>
        </div>

        <form
          className="px-7 pb-7 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field label="Challenge Title">
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </Field>

          <Field label="Challenge Description">
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </Field>

          <Field label="Reward (Feather)">
            <input
              {...register("reward", { required: "Reward is required" })}
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5"
            />
            {errors.reward && (
              <p className="text-red-500 text-sm">{errors.reward.message}</p>
            )}
          </Field>

          <Field label="Challenge Level">
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-gray-100 border-0 rounded-xl px-4 h-[52px]">
                    <SelectValue placeholder="Select Challenge Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHALLENGE_LEVELS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field label="Challenge Type">
            <Controller
              name="type"
              control={control}
              
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-gray-100 border-0 rounded-xl px-4 h-[52px]">
                    <SelectValue placeholder="Select Challenge Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHALLENGE_TYPES.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field label="Target Goal">
            <input
              type="number"
              {...register("targetGoal", {
                required: "Target goal is required",
              })}
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5"
            />
            {errors.targetGoal && (
              <p className="text-red-500 text-sm">
                {errors.targetGoal.message}
              </p>
            )}
          </Field>

          <Field label="Visibility">
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-gray-100 border-0 rounded-xl px-4 h-[52px]">
                    <SelectValue placeholder="Select Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    {VISIBILITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-yellow-400 text-white font-bold rounded-2xl py-3.5"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-200 rounded-2xl py-3.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const Challenges = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetChallengesQuery({
    page,
    searchTerm,
  });

  const [createChallenge] = useCreateChallengeMutation();
  const [deleteChallenge] = useDeleteChallengeMutation();

  const challenges = data?.data?.challenges || [];
  const pagination = data?.data?.pagination;

  const headers = [
    "ID",
    "Title",
    "Reward",
    "Challenge Level",
    "Participants",
    "Completion %",
    "Status",
    "Action",
  ];

  const handleAddChallenge = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("featherReward", data.reward);
      formData.append("challengeLevel", data.level);
      formData.append("type", data.type);
      formData.append("targetAmount", data.targetGoal);
      formData.append("visibility", data.visibility);
      formData.append("isActive", true);

      const res = await createChallenge(formData);
      if (res?.error) {
        return toast.error(
          res.error.data?.message || "Challenge Creation failed",
        );
      }
      if (res.data?.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteChallenge(id);
      if (res?.error) {
        return toast.error(
          res.error.data?.message || "Challenge Deletion failed",
        );
      }
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Challenges</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black"
        >
          <Plus size={22} /> Add New Challenges
        </button>
      </div>

      {/* Search */}
      <div className="mb-8 relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Search..."
          className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-full max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                {headers.map((h) => (
                  <TableHead
                    key={h}
                    className="px-8 py-7 text-[12px] font-black"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-20">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                challenges.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="px-8 py-6">{item.id}</TableCell>
                    <TableCell className="px-8 py-6 font-black">
                      {item.title}
                    </TableCell>
                    <TableCell className="px-8 py-6">{item.reward}</TableCell>
                    <TableCell className="px-8 py-6">
                      {item.challengeLevel}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      {item.participants}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      {item.completionPercentage}
                    </TableCell>
                    <TableCell className="px-8 py-6 font-black">
                      {item.status}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={pagination?.totalPages || 1}
        page={page}
        setPage={setPage}
      />

      {/* Modal */}
      {isModalOpen && (
        <AddChallengeModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddChallenge}
        />
      )}
    </div>
  );
};

export default Challenges;
