import React from "react";
import { languageData } from "../utils/languageData";
import { useSelector } from "react-redux";

const GptInput = () => {
  const language = useSelector((store) => store.appConfig.language);
  console.log(language)
  console.log(languageData)
  console.log(languageData[""])
  return (
    <div className="flex justify-center pt-32 ">
      <form className="w-1/2 grid grid-cols-12 p-3 m-3 bg-black/0">
        <input
          className="bg-white col-span-10 px-3 py-4 mx-2 my-4 rounded-lg"
          placeholder={languageData[language].placeholder}
          type="text"
        />
        <button className=" mr-3 h-14.5 mt-3.5 col-span-2 w-30 bg-red-600 rounded-lg">
          {languageData[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptInput;
