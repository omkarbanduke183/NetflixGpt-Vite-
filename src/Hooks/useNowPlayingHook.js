import { useDispatch } from "react-redux";
import { API_OPTION, NOW_PLAYING_MOVIES_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPLayingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const getNowPlayingMovies = async () => {
    const res = await fetch(NOW_PLAYING_MOVIES_URL, API_OPTION);
    const data = await res.json();
    console.log(data);
    dispatch(addNowPlayingMovies(data.results));
  };
};

export default useNowPLayingMovies;
