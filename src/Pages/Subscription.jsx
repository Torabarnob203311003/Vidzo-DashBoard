import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import FileUpload from "@/Components/shared/UploadFile";
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackagesQuery,
  useUpdatePackageMutation,
} from "@/redux/features/subscription/subscriptionApi";
import Loader from "@/Components/shared/Loader";

const typeColor = (t) =>
  ({ Basic: "#e0f2fe", Standard: "#ede9fe", Premium: "#fef9c3" }[t] || "#f1f5f9");
const typeText = (t) =>
  ({ Basic: "#0369a1", Standard: "#6d28d9", Premium: "#92400e" }[t] || "#475569");

const buildFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "boolean") {
      formData.append(key, value.toString());
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

const FeatureTags = ({ features, onRemove }) => (
  <div className="flex flex-wrap gap-2 mb-3">
    {features.map((f, i) => (
      <span
        key={i}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{ background: "#FFF3CD", color: "#92400e" }}
      >
        {f}
        <button type="button" onClick={() => onRemove(i)} className="text-yellow-700 hover:text-yellow-900">
          <X size={13} />
        </button>
      </span>
    ))}
  </div>
);

const Toggle = ({ value, onChange }) => (
  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-colors"
      style={{ background: value ? "#FFC12D" : "#d1d5db" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
        style={{ left: value ? "26px" : "2px" }}
      />
    </button>
    <span className="text-sm text-slate-500">{value ? "Active" : "Inactive"}</span>
  </div>
);

const PackageModal = ({ isEdit, defaultValues, onClose, onSubmit, isSaving }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues || {},
  });

  const [features, setFeatures] = useState(defaultValues?.features || []);
  const [featInput, setFeatInput] = useState("");
  const [isActive, setIsActive] = useState(defaultValues?.status ?? true);

  const addFeature = () => {
    const val = featInput.trim();
    if (val) { setFeatures((p) => [...p, val]); setFeatInput(""); }
  };

  const removeFeature = (i) => setFeatures((p) => p.filter((_, idx) => idx !== i));

  const submit = (data) =>
    onSubmit({
      ...data,
      price: parseFloat(data.price), // fix: number not string
      features,
      status: isActive,
    });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40">
      <div className="bg-white w-full max-w-xl rounded-[40px] p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto no-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8">
          <X size={32} />
        </button>

        <h3 className="text-3xl font-black mb-10 text-[#1E293B]">
          {isEdit ? "Update Package" : "Add New Package"}
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          {/* Name */}
          <div className="space-y-2">
            <label className="font-black text-sm text-[#1E293B]">Package Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="e.g. Pro Plan"
              className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="font-black text-sm text-[#1E293B]">Slug</label>
            <input
              {...register("slug", { required: "Slug is required" })}
              type="text"
              placeholder="e.g. pro-plan"
              className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4"
            />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-black text-sm text-[#1E293B]">Price ($)</label>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="font-black text-sm text-[#1E293B]">Duration</label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4 border-none">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="z-[110]">
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                      <SelectItem value="Lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="font-black text-sm text-[#1E293B]">Package Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4 border-none">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="z-[110]">
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="font-black text-sm text-[#1E293B]">Description</label>
            <textarea
              {...register("description")}
              placeholder="Brief description of this package..."
              rows={3}
              className="w-full bg-[#F0F0F0] rounded-2xl px-6 py-4 resize-none"
            />
          </div>

          {/* Badge (file) */}
          <FileUpload
            name="badge"
            control={control}
            caption="Upload Badge Image"
            accept="image/*"
            maxSize={100 * 1024 * 1024}
            error={errors.badge?.message}
            rules={{ required: isEdit ? false : "Badge is required" }}
            defaultValue={isEdit ? defaultValues?.badge : undefined}
          />

          {/* Features */}
          <div className="space-y-2">
            <label className="font-black text-sm text-[#1E293B]">Features</label>
            <FeatureTags features={features} onRemove={removeFeature} />
            <div className="flex gap-2">
              <input
                type="text"
                value={featInput}
                onChange={(e) => setFeatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                placeholder="Add a feature and press +"
                className="flex-1 bg-[#F0F0F0] rounded-xl px-5 py-3 text-sm"
              />
              <button
                type="button"
                onClick={addFeature}
                className="bg-[#FFC12D] text-white rounded-xl px-4 py-2 text-xl font-bold hover:bg-[#FFB800]"
              >
                +
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="font-black text-sm text-[#1E293B]">Status</label>
            <Toggle value={isActive} onChange={setIsActive} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-4 bg-[#FFC12D] text-white rounded-2xl font-black hover:bg-[#FFB800] transition-colors"
            >
              {isSaving ? "Saving..." : isEdit ? "Update Package" : "Add Package"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border-2 rounded-2xl font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubscriptionPackages = () => {
  const { data: packages, isLoading } = useGetPackagesQuery();
  const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();
  const [updatePackage, { isLoading: isUpdating }] = useUpdatePackageMutation();
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateTarget, setUpdateTarget] = useState(null);

  const handleCreate = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createPackage(formData);
      if (res?.error) return toast.error(res.error.data?.message || "Creation failed");
      if (res.data?.success) { toast.success(res.data.message); setShowAddModal(false); }
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await updatePackage({ id: updateTarget._id, data: formData });
      if (res?.error) return toast.error(res.error.data?.message || "Update failed");
      if (res.data?.success) { toast.success(res.data.message); setShowUpdateModal(false); }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deletePackage(id);
      if (res?.error) return toast.error(res.error.data?.message || "Deletion failed");
      if (res.data?.success) toast.success(res.data.message);
    } catch (err) { console.error(err); }
  };

  if (isLoading || isDeleting) return <Loader />;

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Subscription Packages</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all"
        >
          <Plus size={22} /> Add New Package
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-100">
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Package</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Badge</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Slug</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Price</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Duration</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Type</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Status</TableHead>
              <TableHead className="px-10 py-5 font-black text-[#1E293B] text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages?.data?.map((pkg, i) => (
              <TableRow key={i}>
                <TableCell className="px-10 py-6">
                  <div className="font-black text-[#1E293B]">{pkg.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{pkg.features?.length} features</div>
                </TableCell>
                <TableCell className="px-10 py-6">
                  {pkg.badge && (
                    <img src={pkg.badge} alt="badge" className="w-10 h-10 rounded-xl object-cover" />
                  )}
                </TableCell>
                <TableCell className="px-10 py-6 text-slate-500 text-sm">{pkg.slug}</TableCell>
                <TableCell className="px-10 py-6 font-black text-[#1E293B]">
                  ${parseFloat(pkg.price).toFixed(2)}
                </TableCell>
                <TableCell className="px-10 py-6 text-slate-500">{pkg.duration}</TableCell>
                <TableCell className="px-10 py-6">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: typeColor(pkg.type), color: typeText(pkg.type) }}
                  >
                    {pkg.type}
                  </span>
                </TableCell>
                <TableCell className="px-10 py-6">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${pkg.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
                    {pkg.status ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => { setUpdateTarget(pkg); setShowUpdateModal(true); }}
                      className="text-gray-800 hover:text-gray-600"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => handleDelete(pkg._id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showAddModal && (
        <PackageModal
          isEdit={false}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreate}
          isSaving={isCreating}
        />
      )}

      {showUpdateModal && updateTarget && (
        <PackageModal
          isEdit={true}
          defaultValues={updateTarget}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdate}
          isSaving={isUpdating}
        />
      )}
    </div>
  );
};

export default SubscriptionPackages;