import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    isGptVisible: false,
    moviesList: null,
    gptMoviesResults: null,
  },
  reducers: {
    changeGptVisible: (state) => {
      state.isGptVisible = !state.isGptVisible;
    },
    addGptMoviesDetails: (state, action) => {
      const { moviesList, gptMoviesResults } = action.payload;
      state.moviesList = moviesList;
      state.gptMoviesResults = gptMoviesResults;
    },
    removeGptMovies: (state) => {
      state.moviesList = null;
      state.gptMoviesResults = null;
    },
  },
});

export const { changeGptVisible, addGptMoviesDetails, removeGptMovies } =
  gptSlice.actions;
export default gptSlice.reducer;
