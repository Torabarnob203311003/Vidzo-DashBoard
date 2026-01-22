import { baseApi } from "@/redux/services/API";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFinancialData: builder.mutation({
      query: (financeData) => {
        return {
          url: "/CreateFinancial",
          method: "POST",
          body: financeData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    updateFinancialData: builder.mutation({
      query: (financeData) => {
        return {
          url: "/UpdateFinancial",
          method: "POST",
          body: financeData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getFinancial: builder.query({
      query: () => {
        return {
          url: "/GetFinancialData",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),

    createHomeData: builder.mutation({
      query: (homeInfo) => {
        return {
          url: "/CreateHomeAuto",
          method: "POST",
          body: homeInfo,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    updateHomeData: builder.mutation({
      query: (homeData) => {
        return {
          url: "/UpdateHomeAuto",
          method: "POST",
          body: homeData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getHome: builder.query({
      query: () => {
        return {
          url: "/GetHomeautoData",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),

    createMedicalData: builder.mutation({
      query: (medicalInfo) => {
        return {
          url: "/CreateMedical",
          method: "POST",
          body: medicalInfo,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    updateMedicalData: builder.mutation({
      query: (medicalData) => {
        return {
          url: "/UpdateMedical",
          method: "POST",
          body: medicalData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getMedical: builder.query({
      query: () => {
        return {
          url: "/GetMedicalData",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),

    createSocialData: builder.mutation({
      query: (socialInfo) => {
        return {
          url: "/CreateSocialInfo",
          method: "POST",
          body: socialInfo,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    updateSocialData: builder.mutation({
      query: (socialData) => {
        return {
          url: "/UpdateSocialInfo",
          method: "POST",
          body: socialData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getSocial: builder.query({
      query: () => {
        return {
          url: "/GetSocialData",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),

    createProfileData: builder.mutation({
      query: (profile) => {
        return {
          url: "/CreateFinancial",
          method: "POST",
          body: profile,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    updateProfileData: builder.mutation({
      query: (profileData) => {
        return {
          url: "/ProfileUpdate",
          method: "PUT",
          body: profileData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: "/ProfileDetails",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),
    getAll: builder.query({
      query: () => {
        return {
          url: `/alluser-data`,
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),
  }),
});

export const {
  useCreateFinancialDataMutation,
  useCreateProfileDataMutation,
  useCreateSocialDataMutation,
  useCreateHomeDataMutation,
  useCreateMedicalDataMutation,
  useUpdateFinancialDataMutation,
  useGetFinancialQuery,
  useUpdateMedicalDataMutation,
  useUpdateHomeDataMutation,
  useGetHomeQuery,
  useGetSocialQuery,
  useUpdateSocialDataMutation,
  useGetProfileQuery,
  useUpdateProfileDataMutation,
  useGetMedicalQuery,
  useGetAllQuery,
} = authApi;
