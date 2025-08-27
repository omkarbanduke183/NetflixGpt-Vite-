import { useDispatch } from "react-redux";
import { API_OPTION, NOW_PLAYING_MOVIES_URL } from "../utils/constants";
import {  addpopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTION);
    const data = await res.json();
    console.log(data);
    dispatch(addpopularMovies(data.results));
  };
};

export default usePopularMovies;