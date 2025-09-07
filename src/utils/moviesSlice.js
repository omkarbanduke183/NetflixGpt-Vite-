import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovie: null,
    trailerVideo: null,
    popularMovie: null,
    topRated: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    addpopularMovies: (state, action) => {
      state.popularMovie = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRated = action.payload;
    },
    trailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    removeMoviesData: (state) => {
      (state.nowPlayingMovie = null),
        (state.trailerVideo = null),
        (state.popularMovie = null),
        (state.topRated = null);
    },
  },
});

export const {
  addNowPlayingMovies,
  addTopRatedMovies,
  trailerVideo,
  addpopularMovies,
  removeMoviesData
} = moviesSlice.actions;
export default moviesSlice.reducer;
