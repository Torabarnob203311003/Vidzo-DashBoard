import { baseApi } from "@/redux/services/API";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createProfile: builder.mutation({
    //   query: (profileDate) => {
    //     return {
    //       url: "admin/create-profile",
    //       method: "POST",
    //       body: profileDate,
    //     };
    //   },
    //   invalidatesTags: ["getCategories"],
    // }),
    getProfile: builder.query({
      query: () => {
        return {
          url: "admin/profile",
          method: "GET",
        };
      },
      providesTags: ["getProfile"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => {
        return {
          url: `admin/profile/update`,
          method: "PATCH",
          body:profileData
        };
      },
      invalidatesTags: ["getProfile"],
    }),
  }),
});

export const {  useGetProfileQuery,useUpdateProfileMutation } = profileApi;
