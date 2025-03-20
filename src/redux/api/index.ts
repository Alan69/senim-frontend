import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTokenResponse } from "modules/auth/redux/api";
import { authActions } from "modules/auth/redux/slices/authSlice";
import { RootState } from "redux/rootReducer";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.sapatest.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({}),
  // @ts-ignore
  async baseQuery(args, api, extraOptions) {
    let result = await fetchBaseQuery({
      baseUrl: "https://api.sapatest.com/api/",
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    })(args, api, extraOptions);

    if (
      result.error &&
      (result.error.status === 401 ||
        result.error.status === 403 ||
        result.error.status === 404)
    ) {
      const refreshToken = (api.getState() as RootState).auth.refreshToken;

      if (refreshToken) {
        const refreshResult = await fetchBaseQuery({
          baseUrl: "https://api.sapatest.com/api/",
        })(
          {
            url: "/token/refresh/",
            method: "POST",
            body: { refresh: refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const newTokens = refreshResult.data as TTokenResponse;
          api.dispatch(
            authActions.setToken({
              token: newTokens.access,
              refreshToken: newTokens.refresh,
            })
          );

          result = await fetchBaseQuery({
            baseUrl: "https://api.sapatest.com/api/",
            prepareHeaders: (headers) => {
              headers.set("Authorization", `Bearer ${newTokens.access}`);
              return headers;
            },
          })(args, api, extraOptions);
        } else {
          api.dispatch(authActions.logOut());
        }
      } else {
        api.dispatch(authActions.logOut());
      }
    }

    if (result.error && result.error.status === 429) {
      console.error("Rate limit exceeded. Please wait before retrying.");
      return result;
    }

    return result;
  },
});

export default baseApi;
