/* eslint-disable no-unused-vars */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logOut, storToken } from "../features/auth/authSlice";

// Base query for API calls
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`, // Vite env
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    const resetToken = getState().auth.resetToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if(resetToken){
      headers.set("resettoken",`${resetToken}`)
    }
    return headers;
  },
});

// Base query with refresh token logic
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // 404 error handling
  if (result.error?.status === 404) {
    toast.error("User not found");
  }

  // 401 error: attempt refresh
  if (result.error?.status === 401) {
    // try {
    //   const res = await fetch(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
    //     {
    //       method: "POST",
    //       credentials: "include",
    //     }
    //   );

    //   const data = await res.json();

    //   if (data.success) {
    //     api.dispatch(storToken(data.data.accessToken));
    //     result = await baseQuery(args, api, extraOptions);
    //   } else {
    //     api.dispatch(logOut());
    //   }
    // } catch (error) {
      api.dispatch(logOut());
    // }
  }

  return result;
};

// Base RTK Query API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["getUser", "getAppointments", "getContents", "getAds"],
  endpoints: () => ({
  }),
});
