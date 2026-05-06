import { baseApi } from "@/redux/services/API";

const streamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStreamById: builder.query({
      query: (id) => {
        return {
          url: `admin/stream/active/${id}/preview`,
          method: "GET",
   
        };
      },
      providesTags: ["getStreams"],
    }),
    giveWarning: builder.mutation({
      query: ({ id, data }) => {
        console.log(data)
        return {
          url: `admin/stream/${id}/warn`,
          method: "POST",
          body: data,
        };
      },
    }),
    endStream: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/stream/${id}/end`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getStreams", "getLiveStreams"],
    }),
    sendChatMessage: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `stream/${id}/chat`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getStreamChat"],
    }),
    getStreamChat: builder.query({
      query: ({ id, page = 1, limit = 50 }) => {
        return {
          url: `stream/${id}/chat`,
          method: "GET",
          params: { page, limit },
        };
      },
      providesTags: ["getStreamChat"],
    }),
  }),
});

export const {
  useGetStreamByIdQuery,
  useGetStreamChatQuery,
  useSendChatMessageMutation,
  useEndStreamMutation,
  useGiveWarningMutation,
} = streamApi;
