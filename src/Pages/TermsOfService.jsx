/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import Loader from "@/Components/shared/Loader";
import { toast } from "sonner";

import {
  useCreateDocumentationMutation,
  useGetDocumentationQuery,
  useUpdateDocumentationMutation,
} from "@/redux/features/documentation/documentationApi";

const TermsOfService = () => {
  const editor = useRef(null);

  const { data, isLoading } = useGetDocumentationQuery("termsOfService");

  const [createDocumentation, { isLoading: isCreating }] =
    useCreateDocumentationMutation();

  const [updateDocumentation, { isLoading: isUpdating }] =
    useUpdateDocumentationMutation();

  const [content, setContent] = useState(
    "<p>Write Terms of Service content here...</p>",
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
        key: "termsOfService",
      };

      if (data?.data?.content) {
        const res = await updateDocumentation({
          type: "termsOfService",
          data: payload,
        });

        if (res?.error) {
          return toast.error(
            res.error.data?.message || "Terms of Service update failed",
          );
        }

        if (res.data?.success) {
          toast.success(res.data.message);
        }
      } else {
        const res = await createDocumentation(payload);

        if (res?.error) {
          return toast.error(
            res.error.data?.message || "Terms of Service creation failed",
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
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <h2 className="text-3xl font-black text-[#1E293B] mb-6">
        Terms of Service
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => {
            setContent(newContent);
            setValue("content", newContent);
          }}
          onChange={(newContent) => {}}
          config={{
            readonly: false,
            height: 600,
            minHeight: 400,
            toolbarButtonSize: "middle",
            theme: "default",

            buttons: [
              "source",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "superscript",
              "subscript",
              "|",
              "ul",
              "ol",
              "outdent",
              "indent",
              "|",
              "font",
              "fontsize",
              "brush",
              "paragraph",
              "|",
              "image",
              "video",
              "file",
              "table",
              "link",
              "|",
              "align",
              "undo",
              "redo",
              "|",
              "hr",
              "eraser",
              "copyformat",
              "|",
              "symbol",
              "fullsize",
              "print",
              "preview",
            ],

            buttonsMD: [
              "bold",
              "italic",
              "underline",
              "|",
              "ul",
              "ol",
              "|",
              "font",
              "fontsize",
              "|",
              "image",
              "link",
              "|",
              "align",
              "undo",
              "redo",
            ],

            buttonsSM: [
              "bold",
              "italic",
              "|",
              "ul",
              "ol",
              "|",
              "fontsize",
              "|",
              "image",
              "link",
            ],

            buttonsXS: ["bold", "italic", "|", "image", "link"],

            style: {
              background: "#ffffff",
              borderRadius: "16px",
              border: "2px solid #e0e7ff",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            },

            toolbarAdaptive: true,
            toolbarSticky: true,
            toolbarStickyOffset: 0,

            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,

            colors: [
              "#000000",
              "#424242",
              "#616161",
              "#757575",
              "#9E9E9E",
              "#1565C0",
              "#2196F3",
              "#4FC3F7",
              "#B3E5FC",
              "#00695C",
              "#009688",
              "#4DB6AC",
              "#B2DFDB",
              "#2E7D32",
              "#4CAF50",
              "#81C784",
              "#C8E6C9",
              "#F57F17",
              "#FFEB3B",
              "#FFF176",
              "#FFF9C4",
              "#E65100",
              "#FF9800",
              "#FFB74D",
              "#FFE0B2",
              "#BF360C",
              "#FF5722",
              "#FF8A65",
              "#FFCCBC",
              "#C62828",
              "#F44336",
              "#E57373",
              "#FFCDD2",
              "#6A1B9A",
              "#9C27B0",
              "#BA68C8",
              "#E1BEE7",
              "#4A148C",
              "#673AB7",
              "#9575CD",
              "#D1C4E9",
            ],

            controls: {
              font: {
                list: {
                  Arial: "Arial",
                  Georgia: "Georgia",
                  Impact: "Impact",
                  Tahoma: "Tahoma",
                  "Times New Roman": "Times New Roman",
                  Verdana: "Verdana",
                  "Courier New": "Courier New",
                  "Comic Sans MS": "Comic Sans MS",
                  Helvetica: "Helvetica",
                  "Trebuchet MS": "Trebuchet MS",
                },
              },
              fontsize: {
                list: "8,9,10,11,12,14,16,18,20,24,28,32,36,48,72",
              },
              paragraph: {
                list: {
                  p: "Paragraph",
                  h1: "Heading 1",
                  h2: "Heading 2",
                  h3: "Heading 3",
                  h4: "Heading 4",
                  h5: "Heading 5",
                  h6: "Heading 6",
                  blockquote: "Quote",
                  pre: "Code",
                },
              },
            },

            link: {
              openInNewTabCheckbox: true,
              noFollowCheckbox: true,
            },

            uploader: {
              insertImageAsBase64URI: true,
            },

            image: {
              openOnDblClick: true,
              editSrc: true,
              editTitle: true,
              editAlt: true,
              editLink: true,
              editSize: true,
              editBorderRadius: true,
              editMargins: true,
              editClass: true,
              editStyle: true,
              editId: true,
              editAlign: true,
              showPreview: true,
              selectImageAfterClose: true,
            },

            table: {
              selectionCellStyle: "border: 1px solid #4A90E2 !important;",
            },

            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            defaultActionOnPaste: "insert_clear_html",

            placeholder: "Start typing your content here...",
            beautifyHTML: true,
            enter: "P",
            spellcheck: true,
            useSearch: true,
            enableDragAndDropFileToEditor: true,
            editorCssClass: "custom-jodit-content",
            statusbar: true,
            allowResizeY: true,

            style: {
              padding: "4px",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
            },

            containerStyle: {
              background: "#ffffff",
              borderRadius: "16px",
              overflow: "hidden",
            },
          }}
        />

        {(!data?.data?.content && (
          <button
            type="submit"
            disabled={isCreating}
            className="px-10 py-4 bg-[#FFC12D] text-white rounded-xl font-black"
          >
            {isCreating ? "Creating..." : "Create Terms of Service"}
          </button>
        )) || (
          <button
            type="submit"
            disabled={isUpdating}
            className="px-10 py-4 bg-[#FFC12D] text-white rounded-xl font-black"
          >
            {isUpdating ? "Updating..." : "Update Terms of Service"}
          </button>
        )}
      </form>
    </div>
  );
};

export default TermsOfService;