import { indexSlice } from "./indexSlice";

export interface Meal {
  _id: string;
  name: string;
  poster_image: string;
  logo_image: string;
  deliveryFee: string;
  arrival: number;
  address: string | undefined;
  rating: string;
  category: string | undefined;
  isCategoryActive: boolean;
  foods: [];
  description: string;
  price: string;
  quantity: number;
  ratings_and_reviews: [] | undefined | null;
  restaurant: string;
  date: string | undefined | null;
  body: Meal[] | undefined | null
}

export type MealResponse = {
    Meal: Meal[]
}

const allMoviesApi = indexSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<MealResponse, void>({
      query: () => ({ url: "/category" }),
    }),

    getRestaurants: build.query<MealResponse, void>({
      query: () => ({ url: "/restaurant" }),
    }),

    getRestaurant: build.query<MealResponse, string>({
      query: (_id) => ({ url: `/restaurant/${_id}` }),
    }),

    getRestaurantFoods: build.query<MealResponse, string>({
      query: (_id) => {
        return { url: `/${_id}/food` };
      },
    }),

    getRestaurantReviews: build.query<MealResponse, string>({
      query: (_id) => {
        return { url: `/${_id}/reviews` };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useGetRestaurantFoodsQuery,
  useGetRestaurantReviewsQuery,
} = allMoviesApi;
