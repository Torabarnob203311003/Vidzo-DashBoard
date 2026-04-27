import { baseApi } from "@/redux/services/API";

const streamMonitoringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getLiveStreams: builder.query({
      query: ({ searchTerm } = {}) => {
        return {
          url: `admin/stream/monitoring`,
          method: "GET",
          params: searchTerm ? { searchTerm } : undefined,
        };
      },
      providesTags: ["getLiveStreams"],
    }),
    updateStreamMonitoring: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/streamMonitoring/${id}/status`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getLiveStreams"],
    }),

  }),
});

export const {  useGetLiveStreamsQuery,useUpdateStreamMonitoringMutation } = streamMonitoringApi;
