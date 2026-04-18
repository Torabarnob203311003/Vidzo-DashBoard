/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { RichTextEditor } from "@/Components/shared/RichTextEditor";
import { useForm } from "react-hook-form";
import Loader from "@/Components/shared/Loader";
import { toast } from "sonner";

import {
  useCreateDocumentationMutation,
  useGetDocumentationQuery,
  useUpdateDocumentationMutation,
} from "@/redux/features/documentation/documentationApi";

const AboutUs = () => {

  const { data, isLoading } = useGetDocumentationQuery("aboutUs");

  const [createDocumentation, { isLoading: isCreating }] =
    useCreateDocumentationMutation();

  const [updateDocumentation, { isLoading: isUpdating }] =
    useUpdateDocumentationMutation();

  const [content, setContent] = useState(
    "<p>Write About Us content here...</p>"
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
      setValue("content", data.data.content);
    }
  }, [data, setValue]);

  const onSubmit = async () => {
    try {
      const payload = {
        content: content,
        key: "aboutUs",
      };

      if (data?.data?.content) {
        const res = await updateDocumentation({
          type: "aboutUs",
          data: payload,
        });

        if (res?.error) {
          return toast.error(
            res.error.data?.message || "About Us update failed"
          );
        }

        if (res.data?.success) {
          toast.success(res.data.message);
        }
      } else {
        const res = await createDocumentation(payload);

        if (res?.error) {
          return toast.error(
            res.error.data?.message || "About Us creation failed"
          );
        }

        if (res.data?.success) {
          toast.success(res.data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC] min-h-screen">
      <h2 className="text-3xl font-black text-[#1E293B] mb-6">
        About Us
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <RichTextEditor
          content={content}
          onChange={(newContent) => setContent(newContent)}
          onBlur={(newContent) => setValue("content", newContent)}
          placeholder="Write About Us content here..."
        />

        {(!data?.data?.content && (
          <button
            type="submit"
            disabled={isCreating}
            className="px-6 sm:px-10 py-4 bg-[#FFC12D] text-white rounded-xl font-black"
          >
            {isCreating ? "Creating..." : "Create About Us"}
          </button>
        )) || (
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 sm:px-10 py-4 bg-[#FFC12D] text-white rounded-xl font-black"
          >
            {isUpdating ? "Updating..." : "Update About Us"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AboutUs;
