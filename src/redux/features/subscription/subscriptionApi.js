import { baseApi } from "@/redux/services/API";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: (params) => {
        return {
          url: `subscription/admin/all`,
          method: "GET",
          params,
        };
      },
      providesTags: ["getSubscriptions"],
    }),
    createPackage: builder.mutation({
      query: (data) => {
        return {
          url: `subscription/admin/tiers`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getSubscriptions"],
    }),
    updatePackage: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `subscription/admin/tiers/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getSubscriptions"],
    }),
    deletePackage: builder.mutation({
      query: ({ id }) => {
        return {
          url: `subscription/admin/tiers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getSubscriptions"],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = subscriptionsApi;
