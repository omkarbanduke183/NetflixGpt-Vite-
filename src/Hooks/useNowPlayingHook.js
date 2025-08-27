import { useDispatch } from "react-redux";
import { API_OPTION, NOW_PLAYING_MOVIES_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useCallback, useEffect, useState } from "react";

const useNowPlayingMovies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const dispatch = useDispatch();

  const getNowPlayingMovies = useCallback(async () => {
    //3
    try {
      console.log("inside now playing movies");
      const res = await fetch(NOW_PLAYING_MOVIES_URL, API_OPTION); //4
      const data = await res.json();
      console.log(data);
      dispatch(addNowPlayingMovies(data.results));
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      console.log(`Err loading movies :`, err);
    }
  }, []);

  useEffect(() => {
    //1
    console.log("inside use effect of now playing movies");
    getNowPlayingMovies(); //2
  }, []);

  return { loading, movies };
};

export default useNowPlayingMovies;
