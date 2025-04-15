import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BannerData: [],
  imageURL: "",
};

export const movieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.BannerData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
  },
});

export const { setBannerData, setImageURL } = movieoSlice.actions;

export default movieoSlice.reducer;
