import baseApi from '../../../../redux/api/index';

export enum ProductType {
  STUDENT= "STUDENT",
  TEACHER = "TEACHER"
}

type TProductResponse = {
  id: string;
  title: string;
  sum: number;
  time: number;
  subject_limit: number;
  description: string;
  product_type: ProductType
}

type TSubjectResponse = {
  id: string;
  title: string;
  is_required: boolean;
}

export type TTest = {
  id: string
  title: string
  questions: TQuestion[]
}

export type TQuestion = {
  id: string
  text: string
  options: TOption[]
}

export type TOption = {
  id: string
  text: string
}

export type TStartTestRequest = {
  product_id: string;
  tests_ids: string[];
}

export type TStartTestResponse = {
  test_is_started: boolean;
  time: number;
  tests: TTest[];
}

export type TCompleteTestRequest = {
  product_id: string;
  tests: {
    id: string;
    questions: {
      id: string;
      option_id: string
    }[]
  }[]
}

export type TCompleteTestResponse = {
  completed_test_id: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductList: build.query<TProductResponse[], void>({
			query: () => ({
				url: '/products/',
				method: 'GET'
			}),
			transformResponse: (response: TProductResponse[]) => response,
    }),
    getProductById: build.query<TProductResponse, string | undefined>({
			query: (id) => ({
				url: `/products/${id}/`,
				method: 'GET'
			}),
			transformResponse: (response: TProductResponse) => response,
    }),
    getSubjectListByProductId: build.query<TSubjectResponse[], string | undefined>({
			query: (product_id) => ({
				url: `/product/${product_id}/tests/`,
				method: 'GET'
			}),
			transformResponse: (response: TSubjectResponse[]) => response,
    }),
    startTest: build.mutation<TStartTestResponse, TStartTestRequest>({
			query: ({product_id, tests_ids}) => ({
				url: '/current/test/',
				method: 'POST',
        body: {
          product_id,
          tests_ids
        }
			}),
			transformResponse: (response: TStartTestResponse) => response,
    }),
    completeTest: build.mutation<TCompleteTestResponse, TCompleteTestRequest>({
			query: ({product_id, tests}) => ({
				url: '/complete/test/',
				method: 'POST',
        body: {
          product_id,
          tests
        }
			}),
			transformResponse: (response: TCompleteTestResponse) => response,
    }),

  }),
	overrideExisting: false,
});

export const { useGetProductListQuery, useGetProductByIdQuery, useGetSubjectListByProductIdQuery, useStartTestMutation, useCompleteTestMutation } = productApi;