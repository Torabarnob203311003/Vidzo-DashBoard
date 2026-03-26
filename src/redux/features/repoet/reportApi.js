import { baseApi } from "@/redux/services/API";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getReport: builder.query({
      query: ({params,tab}) => {
        return {
          url: `admin/report/${tab}`,
          method: "GET",
          params
        };
      },
      providesTags: ["getReports"],
    }),
    updateReport: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/report/${id}/status`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getReports"],
    }),

  }),
});

export const {  useGetReportQuery,useUpdateReportMutation } = reportApi;
