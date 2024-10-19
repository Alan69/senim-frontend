import baseApi from ".";

const testsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTestResults: build.query({
      query: (testId) => `results/${testId}/`,
    }),
  }),
});

export const {

  useFetchTestResultsQuery, 
} = testsApi;

export default testsApi;
