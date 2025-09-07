import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log("All movies from redux store",movies)
  return (
    movies && (
      <div className="-mt-70 md:mt-15 bg-black">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovie} />
        <MovieList title={"Pupular Movies"} movies={movies.popularMovie} />
        <MovieList title={"Top Rated"} movies={movies.topRated} />
      </div>
    )
  );
};

export default SecondContainer;
