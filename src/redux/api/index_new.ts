import { createApi } from "@reduxjs/toolkit/query/react";
import { mockBaseQuery } from "../../mock";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: mockBaseQuery,
  endpoints: (build) => ({}),
});

export default baseApi;
