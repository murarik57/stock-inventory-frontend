import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { [key: string]: any } = {};

const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    setSelectedStore: (state, action: PayloadAction) => ({
      ...state,
      selectedStore: action.payload,
    }),
  },
});

export const { setSelectedStore } = extraSlice.actions;

const extraReducer = extraSlice.reducer;

export default extraReducer;
