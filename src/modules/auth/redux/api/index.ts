import { TUserData } from 'modules/user/redux/slices/api';
import baseApi from '../../../../redux/api/index';

type TLogin = {
  username: string;
  password: string;
}

type TSignUp = {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

type TLoginResponse = {
  data: {
    access: string;
    refresh: string;
  }
}

type TSignUpResponse = {
  access: string;
  refresh: string;
  user: TUserData;
}

export type TTokenResponse = {
  access: string;
  refresh: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TLoginResponse, TLogin>({
      query: ({ username, password }) => ({
        url: '/token/',
        method: 'POST',
        body: {
          username,
          password,
        }
      }),
			transformResponse: (response: TLoginResponse) => response,
      extraOptions: { showErrors: false }
    }),
    signUp: build.mutation<TSignUpResponse, TSignUp>({
      query: ({ username, email, password, password2, first_name, last_name  }) => ({
        url: '/register/',
        method: 'POST',
        body: {
          username,
          email,
          password,
          password2,
          first_name,
          last_name
        }
      }),
			transformResponse: (response: TSignUpResponse) => response,
      extraOptions: { showErrors: false }
    }),
    refreshToken: build.mutation<TTokenResponse, { refresh: string }>({
      query: ({ refresh }) => ({
        url: '/token/refresh/',
        method: 'POST',
        body: { refresh },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: TTokenResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useLoginMutation } = authApi;
