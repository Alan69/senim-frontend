import baseApi from '../../../../redux/api/index';

export type TAllOptions = {
  id: string;
  text: string;
  is_correct: boolean
}

export type TSelectedOption = {
  id: string;
  text: string;
  is_correct: boolean
}

export type TCompletedQuestion = {
  id: string;
  question_text: string;
  selected_option: TSelectedOption | null;
  all_options: TAllOptions[]
}

export type TTest = {
  id: string;
  title: string;
  total_correct_by_test: number;
  total_incorrect_by_test: number;
  questions: TCompletedQuestion[];
}

export interface TProduct {
  id: string;
  title: string;
  total_question_count_by_all_tests: number;
  total_correct_by_all_tests: number;
  total_incorrect_by_all_tests: number;
  tests: TTest[];
}

export interface TCompletedTestResponse {
  id: string;
  completed_date: string;
  start_test_time: string;
  user: string;
  product: TProduct;
}

export interface TCompletedTestListResponse {
  id: string;
  start_test_time: string;
  completed_date: string;
  user: string;
  product: TProduct;
  correct_answers_count: number
}

export const completedTestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCompletedTestList: build.query<TCompletedTestListResponse[], void>({
			query: () => ({
				url: '/completed-tests/',
				method: 'GET'
			}),
			transformResponse: (response: TCompletedTestListResponse[]) => response,
    }),
    getCompletedTestById: build.query<TCompletedTestResponse, string | undefined>({
			query: (id) => ({
				url: `/completed-tests/${id}/`,
				method: 'GET'
			}),
			transformResponse: (response: TCompletedTestResponse) => response,
    }),
  }),
	overrideExisting: false,
});

export const { useGetCompletedTestListQuery, useGetCompletedTestByIdQuery } = completedTestApi;