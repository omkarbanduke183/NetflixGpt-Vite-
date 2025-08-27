import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies && (
      <div className="mt-15">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovie} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovie} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovie} />
      </div>
    )
  );
};

export default SecondContainer;
