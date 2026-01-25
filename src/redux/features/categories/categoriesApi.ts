import { baseApi } from "@/redux/services/API";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCategory: builder.mutation({
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
useCreateCategoryMutation
} = categoryApi;
