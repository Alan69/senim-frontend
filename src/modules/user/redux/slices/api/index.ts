import baseApi from '../../../../../redux/api/index';
import { authActions } from '../../../../auth/redux/slices/authSlice';

export type TUser = {
  username: string
  first_name: string
  last_name: string
  region: string
  school: string
  balance: string
  referral_link: any
  referral_bonus: string
  test_is_started: boolean
}

export type TUserData = {
  user_data: TUser;
};

export type TChangePasswordRequest = {
  current_password: string;
  new_password: string
  new_password2: string
}

export type TChangePasswordResponse = {
  new_password: string;
  refresh: string
  access: string
}

export type TUpdateBalanceResponse = {
  success: string
}

type TUpdateUser = {
  username: string;
  first_name: string;
  last_name: string;
  region: string;
  school: string;
  referral_link?: string;
  referral_bonus?: string
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAuthUser: build.query<TUser, void>({
      query: () => ({
        url: '/user/auth/',
        method: 'GET',
      }),
      transformResponse: (response: TUserData) => response.user_data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setUser(data)); 
        } catch (err) {
          console.error('Failed to fetch user data', err);
        }
      },
    }),
    updateUserProfile: build.mutation<TUpdateUser, TUpdateUser>({
      query: ({ username, first_name, last_name, region, school  }) => ({
        url: '/user/update/',
        method: 'PUT',
        body: {
          username,
          first_name,
          last_name,
          region,
          school,
        }
      }),
			transformResponse: (response: TUpdateUser) => response,
      extraOptions: { showErrors: false }
    }),
    changePassword: build.mutation<TChangePasswordResponse, TChangePasswordRequest>({
      query: ({ current_password, new_password, new_password2 }) => ({
        url: '/change/password/',
        method: 'POST',
        body: {
          current_password,
          new_password,
          new_password2,
        },
      }),
      transformResponse: (response: TChangePasswordResponse) => response,
      extraOptions: { showErrors: false },
    }),
    updateBalance: build.mutation<TUpdateBalanceResponse, void>({
      query: () => ({
        url: '/update/balance/',
        method: 'POST'
      }),
      transformResponse: (response: TUpdateBalanceResponse) => response,
      extraOptions: { showErrors: false },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetAuthUserQuery,
  useGetAuthUserQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useUpdateBalanceMutation
} = userApi;
