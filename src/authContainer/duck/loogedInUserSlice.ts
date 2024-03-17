import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProfileApiResponse } from "./auth.interface";

const initialState: UserProfileApiResponse | unknown = null;

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUserData: (
      state,
      action: PayloadAction<UserProfileApiResponse>,
    ) => action.payload,
  },
});

export const loggedInUserActions = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
