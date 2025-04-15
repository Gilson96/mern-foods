import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/apliSlice';
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
