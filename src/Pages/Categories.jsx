/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetCategoriesQuery } from "../services/apiService";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  X,
  UploadCloud,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import FileUpload from "@/Components/shared/UploadFile";
import { useForm } from "react-hook-form";

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Categories</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all"
        >
          <Plus size={22} /> Add New Category
        </button>
      </div>

      {/* Search */}
      <div className="mb-8 relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search..."
          className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-full max-w-sm focus:outline-none shadow-sm font-medium"
        />
      </div>

      {/* Sadcn Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {["ID", "Category Image", "Category Title", "Action"].map(
                  (header) => (
                    <TableHead
                      key={header}
                      className="px-10 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide"
                    >
                      {header}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-20 text-gray-400 font-bold"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                categories?.map((cat, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <TableCell className="px-10 py-6 text-sm font-bold text-gray-500">
                      0001
                    </TableCell>
                    <TableCell className="px-10 py-6">
                      <img
                        src={`https://picsum.photos/120/80?seed=cat${i}`}
                        className="w-28 h-16 rounded-xl object-cover"
                        alt=""
                      />
                    </TableCell>
                    <TableCell className="px-10 py-6 text-sm font-black text-[#1E293B]">
                      {cat.name}
                    </TableCell>
                    <TableCell className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <button className="text-gray-800">
                          <Edit2 size={20} />
                        </button>
                        <button className="text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-end gap-3">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600">
          <ChevronLeft size={18} /> Previous
        </button>
        {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
          <button
            key={i}
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center ${
              p === 1
                ? "bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20"
                : "text-gray-400"
            }`}
          >
            {p}
          </button>
        ))}
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600">
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-10 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-8 right-8 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={32} strokeWidth={2.5} />
            </button>

            <h3 className="text-3xl font-black text-[#1E293B] mb-10">
              Add New Category
            </h3>

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddModal(false);
              }}
            >
              <div className="space-y-3">
                <label className="text-[15px] font-black text-gray-800 ml-1">
                  Category Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="w-full bg-[#F0F0F0] border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-800 focus:ring-0 placeholder:text-gray-400"
                  required
                />
              </div>
              <FileUpload
                name="url"
                control={control}
                caption=" Upload Image"
                accept="image/*"
                maxSize={100 * 1024 * 1024}
                error={errors.url?.message}
                onFileSelect={(file) => console.log("File selected:", file)}
              />

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#FFC12D] text-white text-lg font-black rounded-2xl shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 bg-white border-2 border-[#1E293B] text-[#1E293B] text-lg font-black rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
