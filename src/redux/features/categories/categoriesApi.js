import { baseApi } from "@/redux/services/API";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryDate) => {
        return {
          url: "admin/create-category",
          method: "POST",
          body: categoryDate,
        };
      },
      invalidatesTags: ["getCategories"],
    }),
    getCategory: builder.query({
      query: (params) => {
        return {
          url: "/category",
          method: "GET",
          params
        };
      },
      providesTags: ["getCategories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/update-category/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["getCategories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `admin/delete-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getCategories"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoryQuery,useUpdateCategoryMutation,useDeleteCategoryMutation } = categoryApi;
