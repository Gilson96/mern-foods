import { apiSlice } from "./apliSlice";
import { Meal } from "./Recipe";

export interface User {
  name: string | undefined | null;
  email: string | null;
  password: string | null;
  address: string | undefined;
  users: [
    {
      name: string | undefined;
      address: string | undefined;
      favouritesRestaurants?: [{ _id: string }];
      orders?: [{
        restaurantId?: string,
        foods?: Meal[],
        id?: string,
        totalPrice: number
      }];
    }
  ];
}

export interface UserResponse {
  email: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PaymenyIntent {
  totalPrice: number;
  clientSecret?: string;
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

    logout: build.mutation<UserResponse, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),

    postToFavourite: build.mutation<
      UserResponse,
      {
        userId: string | undefined;
        body: {
          _id: string;
          name: string;
          deliveryFee: string;
          arrival: number;
          rating: string;
          poster_image: string;
        };
      }
    >({
      query: (data) => {
        const { userId, body } = data;
        return {
          url: `${userId}/favourites`,
          method: "POST",
          body,
        };
      },
    }),

    removeFromFavourite: build.mutation<
      UserResponse,
      { userId: string | undefined; restaurantId: string | undefined }
    >({
      query: (data) => {
        const { userId, restaurantId } = data;
        return {
          url: `${userId}/favourites/${restaurantId}`,
          method: "POST",
        };
      },
    }),

    postToOrders: build.mutation<
      UserResponse,
      {
        _id: string;
        body: {
          restaurantId: string;
          foods: Meal[];
          totalPrice: number;
          timeStamp: number;
        };
      }
    >({
      query: (data) => {
        const { _id, body } = data;
        return {
          url: `${_id}/orders`,
          method: "POST",
          body,
        };
      },
    }),

    postPayementIntent: build.mutation<PaymenyIntent, PaymenyIntent>({
      query: (body) => ({
        url: `payment-intent`,
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  usePostToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  usePostToOrdersMutation,
  usePostPayementIntentMutation,
} = auth;
