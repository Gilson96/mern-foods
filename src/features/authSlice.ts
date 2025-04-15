import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthState = {
  email: string | null;
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null } as AuthState, 
  reducers: {
    setCredentials: (state, action) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },

    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrentToken = (state: RootState) => state.auth.token;
