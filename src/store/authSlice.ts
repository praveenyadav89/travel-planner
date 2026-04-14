import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../types";

export const MOCK_USERS = [
  {
    id: "1",
    name: "Praveen kumar",
    email: "praveen.kumar@kellton.com",
    password: "kellton123",
    avatar: "PK",
  },
  {
    id: "2",
    name: "Praveen Yadav",
    email: "praveen@kellton.com",
    password: "kellton123",
    avatar: "PY",
  },
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
