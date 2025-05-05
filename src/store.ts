import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { indexSlice } from "./features/indexSlice";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  [indexSlice.reducerPath]: indexSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedState = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedState,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(indexSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
