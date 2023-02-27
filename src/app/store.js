import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/LoginPage/LoginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
