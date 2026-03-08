import { useState } from "react";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  X,
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
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categories/categoriesApi";
import Loader from "@/Components/shared/Loader";
import { toast } from "sonner";

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoryQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCategoryDate, setUpdateCategoryDate] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    control: updateControl,
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    reset: updateReset,
  } = useForm();

  // REAL SUBMIT
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);

      const res = await createCategory(formData);
      if (res?.error) {
        return toast.error(
          res.error.data?.message || "Category Creation failed",
        );
      }
      if (res.data?.success) {
        toast.success(res.data.message);
        reset();
        setShowAddModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res?.error) {
        return toast.error(
          res.error.data?.message || "Category Deletion failed",
        );
      }
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }
      console.log(formData, "formData");
      console.log(updateCategoryDate._id, "id");
      const res = await updateCategory({ id: updateCategoryDate._id, data: formData });
      if (res?.error) {
        return toast.error(
          res.error.data?.message || "Category Update failed",
        );
      }
      if (res.data?.success) {
        toast.success(res.data.message);
        updateReset();
        setShowUpdateModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (isLoading || isDeleting) {
    return <Loader></Loader>;
  }
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

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <Table>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              categories?.data?.map((cat, i) => (
                <TableRow key={i}>
                  <TableCell className="px-10 py-6">{cat._id}</TableCell>
                  <TableCell className="px-10 py-6">
                    <img src={cat.image} className="w-28 h-16 rounded-xl" />
                  </TableCell>
                  <TableCell className="px-10 py-6 font-black">
                    {cat.title}
                  </TableCell>
                  <TableCell className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setShowUpdateModal(true);
                          setUpdateCategoryDate(cat);
                        }}
                        className="text-gray-800"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-500"
                      >
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-10 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-8 right-8"
            >
              <X size={32} />
            </button>

            <h3 className="text-3xl font-black mb-10">Add New Category</h3>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3">
                <label className="font-black">Category Title</label>
                <input
                  {...register("title", {
                    required: "Title required",
                  })}
                  type="text"
                  placeholder="Enter Title"
                  className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <FileUpload
                name="image"
                control={control}
                caption=" Upload Image"
                accept="image/*"
                maxSize={100 * 1024 * 1024}
                error={errors.image?.message}
                rules={{ required: "Image required" }}
              />

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 py-4 bg-[#FFC12D] text-white rounded-2xl"
                >
                  {isCreating ? "Saving..." : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 border-2 rounded-2xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && updateCategoryDate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-10 relative">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-8 right-8"
            >
              <X size={32} />
            </button>

            <h3 className="text-3xl font-black mb-10">Update Category</h3>

            <form
              className="space-y-8"
              onSubmit={updateHandleSubmit(handleUpdate)}
            >
              <div className="space-y-3">
                <label className="font-black">Category Title</label>
                <input
                  {...updateRegister("title", {})}
                  type="text"
                  defaultValue={updateCategoryDate.title}
                  placeholder="Enter Title"
                  className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4"
                />
              </div>

              <FileUpload
                name="image"
                control={updateControl}
                caption=" Update Image"
                accept="image/*"
                maxSize={100 * 1024 * 1024}
                error={errors.image?.message}
                defaultValue={updateCategoryDate.image}
              />

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 py-4 bg-[#FFC12D] text-white rounded-2xl"
                >
                  {isUpdating ? "Saving..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 border-2 rounded-2xl"
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
