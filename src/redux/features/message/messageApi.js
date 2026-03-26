import { baseApi } from "@/redux/services/API";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ id, messageData }) => {
        return {
          url: `admin/support/${id}/message`,
          method: "POST",
          body: messageData,
        };
      },
      invalidatesTags: ["getMessages"],
    }),
    getAllConversations: builder.query({
      query: () => {
        return {
          url: "admin/support",
          method: "GET",
        };
      },
      providesTags: ["getConversations"],
    }),
    getAllMessagesOfConversation: builder.query({
      query: (conversationId) => {
        return {
          url: `admin/support/${conversationId}/messages`,
          method: "GET",
        };
      },
      providesTags: ["getMessages"],
    }),
    makeReadAllMassage: builder.mutation({
      query: ({conversationId}) => {
        return {
          url: `admin/support/${conversationId}/mark-read`,
          method: "PATCH",
        };
      },
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

export const {
  useGetAllConversationsQuery,
  useGetAllMessagesOfConversationQuery,
  useMakeReadAllMassageMutation,
  useSendMessageMutation,
} = messageApi;
