'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialUser = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("user")) || null
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },

  reducers: {

    // تسجيل الدخول
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    // تسجيل الخروج
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
