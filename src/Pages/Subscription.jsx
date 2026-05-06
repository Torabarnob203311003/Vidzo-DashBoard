"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Crown,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "../Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";
import { Switch } from "../Components/ui/switch";
import { Badge } from "../Components/ui/badge";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import FileUpload from "../Components/shared/UploadFile";
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackagesQuery,
  useUpdatePackageMutation,
} from "../redux/features/subscription/subscriptionApi";
import Loader from "../Components/shared/Loader";

// ===================== CONSTANTS =====================
const BOOLEAN_FIELDS = [
  { key: "adFree", label: "Ad-Free Experience" },
  { key: "chatBadge", label: "Chat Badge" },
  { key: "creatorOnlyPosts", label: "Creator-Only Posts" },
  { key: "earlyStreamAccess", label: "Early Stream Access" },
  { key: "vipRoomAccess", label: "VIP Room Access" },
  { key: "directQA", label: "Direct Q&A" },
  { key: "earlyContentAccess", label: "Early Content Access" },
];

const DEFAULT_FLAGS = {
  adFree: true,
  chatBadge: false,
  creatorOnlyPosts: true,
  earlyStreamAccess: false,
  vipRoomAccess: false,
  directQA: false,
  earlyContentAccess: false,
};

const BILLING_PERIODS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "lifetime", label: "Lifetime" },
];

// ===================== TIER STYLES =====================
const getTierStyles = (name) => {
  const styles = {
    Supporter: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: <Star className="h-4 w-4" />,
    },
    Premium: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      border: "border-violet-200",
      icon: <Sparkles className="h-4 w-4" />,
    },
    Exclusive: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: <Crown className="h-4 w-4" />,
    },
  };
  return (
    styles[name] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      icon: null,
    }
  );
};

// ===================== FORM DATA BUILDER =====================
const buildFormData = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("price", data.price);
  formData.append("billingPeriod", data.billingPeriod);
  formData.append("isActive", data.isActive);

  if (data.badgeDisplayName) {
    formData.append("badge[displayName]", data.badgeDisplayName);
  }
  if (data.badgeIcon instanceof File) {
    formData.append("badgeIcon", data.badgeIcon);
  }

  data.features?.forEach((f, i) => {
    formData.append(`features[${i}]`, f);
  });

  BOOLEAN_FIELDS.forEach(({ key }) => {
    formData.append(key, data[key] ? "true" : "false");
  });

  formData.append("pulsePointsBonus", data.pulsePointsBonus || 0);
  formData.append("marketplaceDiscount", data.marketplaceDiscount || 0);

  return formData;
};

// ===================== DELETE CONFIRM DIALOG =====================
const DeleteConfirmDialog = ({
  packageName,
  onConfirm,
  onCancel,
  isDeleting,
}) => (
  <Dialog open onOpenChange={onCancel}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-slate-900">
          Delete Package
        </DialogTitle>
      </DialogHeader>
      <p className="text-slate-600 py-4">
        Are you sure you want to delete{" "}
        <strong className="text-slate-900">{packageName}</strong>? This action
        cannot be undone.
      </p>
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isDeleting}
          className="rounded-xl border-slate-200"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

// ===================== PACKAGE MODAL =====================
const PackageModal = ({
  isEdit,
  defaultValues,
  onClose,
  onSubmit,
  isSaving,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultValues?.name || "",
      slug: defaultValues?.slug || "",
      price: defaultValues?.price || "",
      billingPeriod: defaultValues?.billingPeriod || "monthly",
      badgeDisplayName:
        defaultValues?.badge?.displayName ||
        defaultValues?.badgeDisplayName ||
        "",
      pulsePointsBonus: defaultValues?.pulsePointsBonus || 0,
      marketplaceDiscount: defaultValues?.marketplaceDiscount || 0,
    },
  });

  const [features, setFeatures] = useState(defaultValues?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [isActive, setIsActive] = useState(defaultValues?.isActive ?? true);

  const [flags, setFlags] = useState(() => {
    const initialFlags = { ...DEFAULT_FLAGS };
    BOOLEAN_FIELDS.forEach(({ key }) => {
      if (defaultValues?.[key] !== undefined) {
        initialFlags[key] = defaultValues[key];
      }
    });
    return initialFlags;
  });

  const addFeature = useCallback(() => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
      setNewFeature("");
    }
  }, [newFeature, features]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addFeature();
      }
    },
    [addFeature],
  );

  const removeFeature = useCallback(
    (index) => setFeatures((prev) => prev.filter((_, i) => i !== index)),
    [],
  );

  const updateFlag = useCallback(
    (key, value) => setFlags((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const submit = (data) =>
    onSubmit({
      ...data,
      price: parseFloat(data.price),
      features,
      isActive,
      ...flags,
    });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            {isEdit ? "Update Package" : "Add New Package"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-slate-700"
              >
                Package Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("name", { required: "Name is required" })}
                id="name"
                placeholder="e.g. Premium"
                className="rounded-xl border-slate-200"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="slug"
                className="text-sm font-semibold text-slate-700"
              >
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("slug", { required: "Slug is required" })}
                id="slug"
                placeholder="e.g. premium"
                className="rounded-xl border-slate-200"
              />
              {errors.slug && (
                <p className="text-red-500 text-xs">{errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Price & Billing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-semibold text-slate-700"
              >
                Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="rounded-xl border-slate-200"
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="billingPeriod"
                className="text-sm font-semibold text-slate-700"
              >
                Billing Period
              </Label>
              <Controller
                name="billingPeriod"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-xl border-slate-200">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {BILLING_PERIODS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Bonuses */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="pulsePointsBonus"
                className="text-sm font-semibold text-slate-700"
              >
                Pulse Points Bonus (%)
              </Label>
              <Input
                {...register("pulsePointsBonus")}
                id="pulsePointsBonus"
                type="number"
                placeholder="0"
                className="rounded-xl border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="marketplaceDiscount"
                className="text-sm font-semibold text-slate-700"
              >
                Marketplace Discount (%)
              </Label>
              <Input
                {...register("marketplaceDiscount")}
                id="marketplaceDiscount"
                type="number"
                placeholder="0"
                className="rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* Badge Section */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700">
              Badge
            </Label>
            <div className=" gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="badgeDisplayName"
                  className="text-xs text-slate-500"
                >
                  Display Name
                </Label>
                <Input
                  {...register("badgeDisplayName")}
                  id="badgeDisplayName"
                  placeholder="e.g. Premium"
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Badge Icon</Label>
              <FileUpload
                name="badgeIcon"
                control={control}
                caption="Upload Image"
                accept="image/*"
                defaultValue={defaultValues?.badge?.icon}
              />
            </div>
          </div>
          {/* Boolean Toggles */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700">
              Features & Permissions
            </Label>
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              {BOOLEAN_FIELDS.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label
                    htmlFor={key}
                    className="text-sm text-slate-600 cursor-pointer"
                  >
                    {label}
                  </Label>
                  <Switch
                    id={key}
                    checked={!!flags[key]}
                    onCheckedChange={(checked) => updateFlag(key, checked)}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Active Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <Label
              htmlFor="isActive"
              className="text-sm font-semibold text-slate-700 cursor-pointer"
            >
              Active Status
            </Label>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700">
              Features List
            </Label>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {features.length === 0 ? (
                <p className="text-sm text-slate-400 italic">
                  No features added yet
                </p>
              ) : (
                features.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-amber-100 text-amber-800 border-0 px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:text-amber-900"
                      aria-label={`Remove ${feature}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a feature..."
                className="rounded-xl border-slate-200 flex-1"
              />
              <Button
                type="button"
                onClick={addFeature}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-4"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl py-2.5"
            >
              {isSaving
                ? "Saving..."
                : isEdit
                  ? "Update Package"
                  : "Add Package"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl py-2.5 border-slate-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ===================== PAGE =====================
const SubscriptionPackages = () => {
  const { data, isLoading, error } = useGetPackagesQuery();
  const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();
  const [updatePackage, { isLoading: isUpdating }] = useUpdatePackageMutation();
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isSaving = isCreating || isUpdating;

  const packages = useMemo(() => data?.data || [], [data]);

  const openAddModal = useCallback(() => {
    setEditingPackage(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((pkg) => {
    setEditingPackage(pkg);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingPackage(null);
  }, []);

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const fd = buildFormData(formData);

        if (editingPackage) {
          await updatePackage({ id: editingPackage._id, data: fd }).unwrap();
          toast.success("Package updated successfully");
        } else {
          await createPackage(fd).unwrap();
          toast.success("Package created successfully");
        }

        closeModal();
      } catch (err) {
        toast.error(err?.data?.message || "An error occurred");
      }
    },
    [editingPackage, updatePackage, createPackage, closeModal],
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      await deletePackage({ id: deleteTarget._id }).unwrap();
      toast.success("Package deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete package");
    }
  }, [deleteTarget, deletePackage]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10 flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4 font-medium">Failed to load packages</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Subscription Packages
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your subscription tiers and pricing
          </p>
        </div>
        <Button
          onClick={openAddModal}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Package
        </Button>
      </div>

      {/* Table Container */}
      {packages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
          <p className="text-slate-500 mb-4">No packages found</p>
          <Button
            onClick={openAddModal}
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
          >
            Create your first package
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700 py-4 px-6">
                  Package
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4">
                  Price
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4">
                  Billing
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4 text-center">
                  Ad-Free
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4 text-center">
                  Chat Badge
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4 text-center">
                  VIP Access
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4">
                  Bonuses
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-4">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 px-6 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => {
                const tierStyle = getTierStyles(pkg.name);
                return (
                  <TableRow key={pkg._id} className="hover:bg-slate-50/50">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {pkg.badge?.icon ? (
                          <img
                            src={pkg.badge.icon}
                            alt={pkg.badge.displayName}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          />
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-xl ${tierStyle.bg} ${tierStyle.border} border flex items-center justify-center ${tierStyle.text}`}
                          >
                            {tierStyle.icon}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">
                            {pkg.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {pkg.features?.length || 0} features
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="font-bold text-slate-900 text-lg">
                        ${pkg.price.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="text-slate-600 capitalize">
                        {pkg.billingPeriod}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      {pkg.adFree ? (
                        <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      {pkg.chatBadge ? (
                        <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      {pkg.vipRoomAccess ? (
                        <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="space-y-1">
                        {pkg.pulsePointsBonus > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-violet-100 text-violet-700 border-0 text-xs"
                          >
                            +{pkg.pulsePointsBonus}% Points
                          </Badge>
                        )}
                        {pkg.marketplaceDiscount > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-700 border-0 text-xs ml-1"
                          >
                            {pkg.marketplaceDiscount}% Off
                          </Badge>
                        )}
                        {pkg.pulsePointsBonus === 0 &&
                          pkg.marketplaceDiscount === 0 && (
                            <span className="text-slate-400 text-sm">—</span>
                          )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <Badge
                        variant={pkg.isActive ? "default" : "secondary"}
                        className={
                          pkg.isActive
                            ? "bg-emerald-100 text-emerald-700 border-0"
                            : "bg-slate-100 text-slate-500 border-0"
                        }
                      >
                        {pkg.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(pkg)}
                          className="h-9 w-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          aria-label={`Edit ${pkg.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(pkg)}
                          className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                          aria-label={`Delete ${pkg.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <PackageModal
          isEdit={!!editingPackage}
          defaultValues={editingPackage}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSaving={isSaving}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteConfirmDialog
          packageName={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default SubscriptionPackages;
