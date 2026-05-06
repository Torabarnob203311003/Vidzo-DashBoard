import { baseApi } from "../../services/API";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => {
        return {
          url: "registerUser",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getProfile"],
    }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: "admin/login",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getProfile"],
    }),

    forgetPassword: builder.mutation({
      query: (emailData) => {
        return {
          url: "admin/forget-password",
          method: "POST",
          body: emailData,
        };
      },
      invalidatesTags: ["getProfile"],
    }),

    resendOTP: builder.mutation({
      query: (user) => {
        return {
          url: "admin/resend-otp",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getProfile"],
    }),
    verifyOTP: builder.mutation({
      query: (user) => {
        return {
          url: "admin/verify-reset-otp",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getProfile"],
    }),

    resetPassword: builder.mutation({
      query: (updatedData) => {
        return {
          url: "admin/reset-password",
          method: "POST",
          body: updatedData,
        };
      },
      invalidatesTags: ["getProfile"],
    }),

    changePassword: builder.mutation({
      query: (authData) => {
        return {
          url: "admin/change-password",
          method: "PATCH",
          body: authData,
        };
      },
      invalidatesTags: ["getProfile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useSignupMutation,
  useVerifyOTPMutation
} = authApi;
