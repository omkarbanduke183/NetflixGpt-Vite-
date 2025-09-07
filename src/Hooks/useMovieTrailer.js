import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { trailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();
  const trailerKey = useSelector((store) => store.movies?.trailerVideo);


  const getMovieVideo = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos`, API_OPTION)
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find((video) => video.type === "Trailer");
        if (trailer) {
          dispatch(trailerVideo(trailer));
        }
      })
      .catch((err) => console.error("Error fetching trailer:", err));
  };

  useEffect(() => {
    !trailerKey && getMovieVideo();
  }, [movieID]); // ✅ only runs when movieID changes
};
export default useMovieTrailer;
