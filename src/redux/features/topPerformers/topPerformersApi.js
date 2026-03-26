import { baseApi } from "@/redux/services/API";

const topPerformersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getTopPerformers: builder.query({
      query: (params) => {
        return {
          url: `admin/top-performers`,
          method: "GET",
          params
         
        };
      },
      providesTags: ["getTopPerformers"],
    }),
    updateTopPerformers: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/topPerformers/${id}/status`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getTopPerformers"],
    }),

  }),
});

export const {  useGetTopPerformersQuery,useUpdateTopPerformersMutation } = topPerformersApi;
