import AppUrl, { baseQuery } from "Config/appUrl";
import { LoginPayload, UserProfileApiResponse } from "./auth.interface";
import { LoginResponseData } from "Interfaces/profile.interface";
import { createApi } from "@reduxjs/toolkit/query/react";

const tagName = ["Profile"];

export const authApi = createApi({
  baseQuery,
  reducerPath: "auth",
  tagTypes: tagName,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseData, LoginPayload>({
      query: (credentials) => ({
        url: AppUrl.LOGIN_URL,
        method: "POST",
        body: credentials,
      }),
    }),

    getProfile: builder.query<UserProfileApiResponse, void>({
      providesTags: tagName,
      query: () => AppUrl.PROFILE,
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useLazyGetProfileQuery } =
  authApi;
