import { baseApi } from "@/redux/services/API";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => {
        return {
          url: `admin/users/streamers`,
          method: "GET",
          params,
        };
      },
      providesTags: ["getUsers"],
    }),
    getUserDetails: builder.query({
      query: (id) => {
        return {
          url: `admin/users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["getUsers"],
    }),
    blockUser: builder.mutation({
      query: (id) => {
        return {
          url: `admin/users/${id}/block`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["getUsers"],
    }),
    unblockUser: builder.mutation({
      query: (id) => {
        return {
          url: `admin/users/${id}/unblock`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["getUsers"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApi;
