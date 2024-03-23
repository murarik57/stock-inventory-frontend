import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import constants from "Utils/constants";

const { ACCESS_TOKEN } = constants;

const { REACT_APP_BASE_URL } = process.env;

const AppUrl = {
  LOGIN_URL: "/auth/login",
  PROFILE: "/users/getCurrentUser",
  PRODUCT: "/products",
  ORDER: "/orders",
};

Object.freeze(AppUrl);

const reqHeaders = fetchBaseQuery({
  baseUrl: REACT_APP_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  try {
    const response = await reqHeaders(args, api, extraOptions);

    return response;
  } catch (error) {
    console.log("baseQuery error", error);
    return { error };
  }
};

export default AppUrl;
