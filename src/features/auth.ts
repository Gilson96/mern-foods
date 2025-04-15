import { apiSlice } from "./apliSlice";
import { Meal } from "./Recipe";

export interface User {
  name: string | undefined | null;
  email: string | null;
  password: string | null;
  address: string | undefined;
}

export interface UserResponse {
  email: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

const auth = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),

    getUser: build.query<User, void>({
      query: () => ({ url: "/user" }),
    }),
    
    postToFavourite: build.mutation<UserResponse, Meal>({
      query: (data) => {
        const { _id, body } = data;
        return {
          url: `${_id}/favourite`,
          method: "POST",
          body,
        };
      },
    }),

    postToOrders: build.mutation<UserResponse, Meal>({
      query: (data) => {
        const { _id, body } = data;
        return {
          url: `${_id}/orders`,
          method: "POST",
          body,
        };
      },
    }),

  }),
  overrideExisting: false,
});

export const { useLoginMutation, usePostToFavouriteMutation, usePostToOrdersMutation, useGetUserQuery } = auth;
