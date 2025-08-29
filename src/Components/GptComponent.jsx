import React from "react";
import GptInput from "./GptInput";
import GptResult from "./GptResult";
import { NETFLIX_BG_IMAGE } from "../utils/constants";

const GptComponent = () => {
  return (
    <div>
      <div className="absolute -z-20">
        <img src={NETFLIX_BG_IMAGE} alt="logo" />
      </div>
      <GptInput />
      <GptResult />
    </div>
  );
};

export default GptComponent;
