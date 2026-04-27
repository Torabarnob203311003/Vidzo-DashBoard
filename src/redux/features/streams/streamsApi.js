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
      invalidatesTags: ["getStreams"],
    }),
    endStream: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/stream/${id}/end`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getStreams"],
    }),
    sendChatMessage: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/stream/${id}/chat`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getStreams"],
    }),
  }),
});

export const {
  useGetStreamByIdQuery,
  useSendChatMessageMutation,
  useEndStreamMutation,
  useGiveWarningMutation,
} = streamApi;
