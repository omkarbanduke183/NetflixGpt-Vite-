import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    isGptVisible: false,
  },
  reducers: {
    changeGptVisible: (state) => {
      state.isGptVisible = !state.isGptVisible;
    },
  },
});

export const { changeGptVisible } = gptSlice.actions;
export default gptSlice.reducer;
