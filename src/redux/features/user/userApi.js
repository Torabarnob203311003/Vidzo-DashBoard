import { baseApi } from "@/redux/services/API";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProxy: builder.query({
      query: (userId) => {
        return {
          url: "getAllProxyset/" + userId,
          method: "GET",
        };
      },
    }),

    getUser: builder.query({
      query: (id) => {
        return {
          url: `search`,
          method: "GET",
          params: { searchTerm: id },
        };
      },
    }),
    getUserGrantors: builder.query({
      query: () => {
        return {
          url: `my-proxy-users/`,
          method: "GET",
        };
      },
    }),
    getUserGrantorData: builder.query({
      query: (id) => {
        return {
          url: `proxyset-call-api/${id}`,
          method: "GET",
        };
      },
    }),

    setProxy: builder.mutation({
      query: (id) => {
        return {
          url: `proxyset/${id}`,
          method: "POST",
        };
      },
    }),

    blockUser: builder.mutation({
      query: (id) => {
        return {
          url: `users/block/${id}`,
          method: "DELETE",
        };
      },
    }),

    getAllUsers: builder.query({
      query: (query) => {
        return {
          url: "users",
          method: "GET",
          params: query,
        };
      },
    }),

    getPlans: builder.query({
      query: () => {
        return {
          url: "packages",
          method: "GET",
        };
      },
    }),
    createCheckoutSession: builder.mutation({
      query: (id) => {
        return {
          url: `create-checkout-session/${id}`,
          method: "POST",
        };
      },
    }),

    sendMessage: builder.mutation({
      query: (body) => {
        return {
          url: `create-report`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetPlansQuery,

  useSendMessageMutation,

  useGetProxyQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useSetProxyMutation,
  useGetUserQuery,
  useGetAdminStatsQuery,
  useGetUserGrantorsQuery,
  useGetUserGrantorDataQuery,
} = userApi;
