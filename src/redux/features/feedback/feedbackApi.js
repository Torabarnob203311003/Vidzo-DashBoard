import { baseApi } from "@/redux/services/API";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    useGetFeedback: builder.query({
      query: () => {
        return {
          url: `admin/feedback`,
          method: "GET",
        };
      },
      providesTags: ["getFeedback"],
    }),
  }),
});

export const { useUseGetFeedbackQuery } = feedbackApi;
