import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 bg-black/80">
      <h1 className="text-white text-3xl py-6  relative z-20">{title}</h1>
      <div className="flex relative  overflow-x-scroll hide-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} poster={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
