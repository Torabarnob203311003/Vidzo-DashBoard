import { baseApi } from "../../services/API";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    useGetFeedback: builder.query({
      query: (params) => {
        return {
          url: `admin/feedback`,
          method: "GET",
          params
        };
      },
      providesTags: ["getFeedback"],
    }),
  }),
});

export const { useUseGetFeedbackQuery } = feedbackApi;
