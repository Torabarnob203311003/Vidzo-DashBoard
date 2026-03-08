import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
} from "@/redux/features/documentation/documentationApi";
import { toast } from "sonner";
import Loader from "@/Components/shared/Loader";

const FAQ = () => {
  const { data: faqs, isLoading } = useGetFAQQuery();

  const [createFaq, { isLoading: isCreating }] = useCreateFAQMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFAQMutation();
  const [deleteFaq] = useDeleteFAQMutation();

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updateFaqData, setUpdateFaqData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFaqId, setDeleteFaqId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // OPEN ADD MODAL
  const openAddModal = () => {
    setIsEdit(false);
    setQuestion("");
    setAnswer("");
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (faq) => {
    setIsEdit(true);
    setUpdateFaqData(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setShowModal(true);
  };

  // CREATE OR UPDATE
  const handleSubmit = async () => {
    try {
      const payload = {
        question,
        answer,
      };

      if (isEdit) {
        const res = await updateFaq({
          id: updateFaqData._id,
          data: payload,
        });

        if (res?.error) {
          return toast.error(res.error.data?.message || "FAQ update failed");
        }

        if (res.data?.success) {
          toast.success(res.data.message);
          setShowModal(false);
        }
      } else {
        const res = await createFaq(payload);

        if (res?.error) {
          return toast.error(res.error.data?.message || "FAQ creation failed");
        }

        if (res.data?.success) {
          toast.success(res.data.message);
          setShowModal(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE WITH ALERT
  const handleDelete = async () => {
    try {
      const res = await deleteFaq(deleteFaqId);

      if (res?.error) {
        return toast.error(res.error.data?.message || "FAQ deletion failed");
      }

      if (res.data?.success) {
        toast.success(res.data.message);
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">
          Frequently Asked Questions
        </h2>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all"
        >
          <Plus size={22} /> Add New FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs?.data?.map((f) => (
          <div
            key={f._id}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <h3 className="text-xl font-black text-[#1E293B] mb-4">
              {f.question}
            </h3>

            <p className="text-gray-500 font-bold leading-relaxed mb-6">
              {f.answer}
            </p>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
              <button
                onClick={() => openEditModal(f)}
                className="flex items-center gap-2 px-6 py-2 bg-white border border-yellow-400 text-yellow-500 rounded-lg text-sm font-black hover:bg-yellow-50 transition-colors"
              >
                <Edit2 size={16} /> Edit
              </button>

              <button
                onClick={() => {
                  setDeleteFaqId(f._id);
                  setShowDeleteModal(true);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-white border border-red-400 text-red-500 rounded-lg text-sm font-black hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 w-[460px]">
            <h2 className="text-lg font-bold mb-5">
              {isEdit ? "Update FAQ" : "Add New FAQ"}
            </h2>

            {/* Question */}
            <div className="mb-4">
              <label className="font-semibold">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg"
              />
            </div>

            {/* Answer */}
            <div className="mb-6">
              <label className="font-semibold">Answer</label>
              <textarea
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
                className="px-6 py-2 bg-[#F5A623] text-white rounded-lg"
              >
                {isEdit
                  ? isUpdating
                    ? "Updating..."
                    : "Update"
                  : isCreating
                    ? "Adding..."
                    : "Add"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border rounded-lg text-red-500 border-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 text-center">
            <h3 className="text-xl font-black mb-4">Delete FAQ</h3>

            <p className="text-gray-500 mb-8">
              Are you sure you want to delete this FAQ?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition"
              >
                Delete
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 border rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
