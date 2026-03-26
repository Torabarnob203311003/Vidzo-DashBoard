import { baseApi } from "@/redux/services/API";

const challengesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChallenge: builder.mutation({
      query: (challengeData) => {
        return {
          url: "admin/challenge-create",
          method: "POST",
          body: challengeData,
        };
      },
      invalidatesTags: ["getChallenges"],
    }),
    getChallenges: builder.query({
      query: (params) => {
        return {
          url: `admin/challenge-list`,
          method: "GET",
          params,
        };
      },
      providesTags: ["getChallenges"],
    }),

    deleteChallenge: builder.mutation({
      query: (id) => {
        return {
          url: `admin/challenge-delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getChallenges"],
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useCreateChallengeMutation,
  useDeleteChallengeMutation,
} = challengesApi;
