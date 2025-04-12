import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BannerData: [],
};

export const movieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.BannerData = action.payload;
    },
  },
});

export const { setBannerData } = movieoSlice.actions;

export default movieoSlice.reducer;
