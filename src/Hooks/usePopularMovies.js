import { useDispatch, useSelector } from "react-redux";
import { API_OPTION, NOW_PLAYING_MOVIES_URL } from "../utils/constants";
import { addpopularMovies } from "../utils/moviesSlice";
import { useCallback, useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovie = useSelector((store) => store.movies.popularMovie);
  useEffect(() => {
    !popularMovie && getPopularMovies();
  }, []);

  const getPopularMovies = useCallback(async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTION
      );
      const data = await res.json();
      console.log(data);
      dispatch(addpopularMovies(data.results));
    } catch (err) {
      console.log("error in pupularMovies", err);
    }
  }, []);
};

export default usePopularMovies;
