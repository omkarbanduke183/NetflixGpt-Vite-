import { useDispatch } from "react-redux";
import { API_OPTION, NOW_PLAYING_MOVIES_URL } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useCallback, useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTopRatedMovies();
  }, []);

  const getTopRatedMovies = useCallback(async () => {
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        API_OPTION
      );
      const data = await res.json();
      console.log(data);
      dispatch(addTopRatedMovies(data.results));
    } catch (err) {
      console.log("error in pupularMovies", err);
    }
  }, []);
};

export default useTopRatedMovies;