import { baseApi } from "@/redux/services/API";

const documentationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDocumentation: builder.mutation({
      query: (documentationData) => {
        return {
          url: "admin/static-content",
          method: "POST",
          body: documentationData,
        };
      },
      invalidatesTags: ["getDocumentation"],
    }),
    getDocumentation: builder.query({
      query: (type) => {
        return {
          url: `admin/static-content/${type}`,
          method: "GET",
        };
      },
      providesTags: ["getDocumentation"],
    }),
    updateDocumentation: builder.mutation({
      query: ({ type, data }) => {
        return {
          url: `admin/static-content/${type}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["getDocumentation"],
    }),
    createFAQ: builder.mutation({
      query: (FAQData) => {
        return {
          url: "admin/faq",
          method: "POST",
          body: FAQData,
        };
      },
      invalidatesTags: ["getFAQ"],
    }),
    getFAQ: builder.query({
      query: () => {
        return {
          url: `admin/faq`,
          method: "GET",
        };
      },
      providesTags: ["getFAQ"],
    }),
    updateFAQ: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getFAQ"],
    }),
    deleteFAQ: builder.mutation({
      query: (id) => {
        return {
          url: `admin/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getFAQ"],
    }),
  }),
});

export const {
  useCreateDocumentationMutation,
  useGetDocumentationQuery,
  useUpdateDocumentationMutation,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
} = documentationApi;
