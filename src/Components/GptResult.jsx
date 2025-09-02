import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptResult = () => {
  const { moviesList, gptMoviesResults } = useSelector((store) => store.gpt);
  if (!moviesList) return null;
  return (
    <div>
      {moviesList.map((movieTitle, i) => (
        <MovieList key={i} title={movieTitle} movies={gptMoviesResults[i]} />
      ))}
    </div>
  );
};

export default GptResult;
