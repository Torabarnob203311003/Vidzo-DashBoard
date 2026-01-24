import { baseApi } from "@/redux/services/API";

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
      invalidatesTags: ["getUser"],
    }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: "admin/login",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getUser"],
    }),

    forgetPassword: builder.mutation({
      query: (emailData) => {
        return {
          url: "admin/forget-password",
          method: "POST",
          body: emailData,
        };
      },
      invalidatesTags: ["getUser"],
    }),

    resendOTP: builder.mutation({
      query: (user) => {
        return {
          url: "admin/resend-otp",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    verifyOTP: builder.mutation({
      query: (user) => {
        return {
          url: "admin/verify-reset-otp",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getUser"],
    }),

    resetPassword: builder.mutation({
      query: (updatedData) => {
        return {
          url: "admin/reset-password",
          method: "POST",
          body: updatedData,
        };
      },
      invalidatesTags: ["getUser"],
    }),

    changePassword: builder.mutation({
      query: (authData) => {
        return {
          url: "change-password",
          method: "POST",
          body: authData,
        };
      },
      invalidatesTags: ["getUser"],
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
