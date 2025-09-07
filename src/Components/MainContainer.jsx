import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovie);
  if (!movies) return;
  console.log(movies);
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  console.log(mainMovie);
  return (
    <div className="pt-[30%] md:pt-0 bg-black">
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieID={id} />
    </div>
  );
};

export default MainContainer;
