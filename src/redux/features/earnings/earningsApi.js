import { baseApi } from "@/redux/services/API";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: (params) => {
        return {
          url: `admin/earnings`,
          method: "GET",
          params,
        };
      },
      providesTags: ["getEarnings"],
    }),
  }),
});

export const { useGetEarningsQuery } = earningApi;
