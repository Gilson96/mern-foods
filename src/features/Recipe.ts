import { apiSlice } from "./apliSlice";

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
  isCategoryActive: string;
  foods: [];
  description: string;
  price: string;
  quantity: number;
  ratings_and_reviews: [] | undefined;
  restaurant: string;
  date: string | undefined;
  body: Meal[] | undefined
  foodsInTheBasket: Meal[]
}

const allMoviesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Meal[], void>({
      query: () => ({ url: "/category" }),
    }),

    getRestaurants: build.query<Meal[], void>({
      query: () => ({ url: "/restaurant" }),
    }),

    getRestaurant: build.query<Meal, string>({
      query: (_id) => ({ url: `/restaurant/${_id}` }),
    }),

    getRestaurantFoods: build.query<Meal, string>({
      query: (_id) => {
        return { url: `/${_id}/food` };
      },
    }),

    getRestaurantReviews: build.query<Meal, string>({
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
