import { createSlice } from "@reduxjs/toolkit";

const appConfig = createSlice({
  name: "appConfig",
  initialState: {
    language: "en",
  },
  reducers: {
    changeAppLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeAppLanguage } = appConfig.actions;
export default appConfig.reducer;


