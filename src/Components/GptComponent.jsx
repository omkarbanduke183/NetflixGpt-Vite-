import React from "react";
import GptInput from "./GptInput";
import GptResult from "./GptResult";
import { NETFLIX_BG_IMAGE } from "../utils/constants";

const GptComponent = () => {
  return (
    <>
      <div className="fixed -z-20">
        <img className="h-screen w-screen object-cover" src={NETFLIX_BG_IMAGE} alt="logo" />
      </div>
      <div>
        <GptInput />
        <GptResult />
      </div>
    </>
  );
};

export default GptComponent;
