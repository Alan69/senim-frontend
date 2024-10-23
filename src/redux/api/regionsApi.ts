import baseApi from '.';

type TRegionListResponse = {
  id: string;
  name: string;
  region_type: string;
  description: string;
}

export const regionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRegionList: build.query<TRegionListResponse[], void>({
			query: () => ({
				url: '/regions/',
				method: 'GET'
			}),
			transformResponse: (response: TRegionListResponse[]) => response,
    }),
  }),
	overrideExisting: false,
});

export const { useGetRegionListQuery } = regionsApi;
