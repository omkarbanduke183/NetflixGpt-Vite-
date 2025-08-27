import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-l w-2/5 py-6">{overview}</p>
      <div>
        <button className="border-1 bg-white  text-black w-24 p-1 rounded m-2 hover:bg-white/80">
          Play
        </button>
        <button className="border-1 text-white w-24 p-1 rounded m-2  bg-gray-400/50 ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
