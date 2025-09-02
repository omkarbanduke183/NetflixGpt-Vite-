import React, { useRef } from "react";
import { languageData } from "../utils/languageData";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openAi";
import { API_OPTION } from "../utils/constants";
import { addGptMoviesDetails } from "../utils/gptSlice";

const GptInput = () => {
  const dispatch = useDispatch()
  const language = useSelector((store) => store.appConfig.language);
  const searchText = useRef(null);
  const getTMDBmovies = async (movie) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );
    const data = await res.json();
    return data.results;
  };
  const onBtnSearchClick = async () => {
    const quary =
      "Act as a movie recommendation system for the query:" +
      searchText.current.value +
      ". Only give me namef of 5 movies, comma seperated like the example result given ahead. Example result: Golmal, Sholey, Gadar, Housefull, Gabbar";
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "developer", content: quary }],
    });
    console.log(completion?.choices[0]?.message?.content);
    const moviesList = completion?.choices[0]?.message?.content?.split(",");
    console.log(moviesList);
    const promiseArray = moviesList.map((movie) => getTMDBmovies(movie));
    const gptMoviesResults = await Promise.all(promiseArray);
    dispatch(addGptMoviesDetails({moviesList:moviesList,gptMoviesResults:gptMoviesResults}))
    console.log("promiseArray", promiseArray);
    console.log("gptMoviesResult", gptMoviesResults);
  };
  return (
    <div className="flex justify-center pt-32 ">
      <form
        className="w-1/2 grid grid-cols-12 p-3 m-3 bg-black/0"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="bg-white col-span-10 px-3 py-4 mx-2 my-4 rounded-lg"
          placeholder={languageData[language].placeholder}
          type="text"
        />
        <button
          className=" mr-3 h-14.5 mt-3.5 col-span-2 w-30 bg-red-600 rounded-lg"
          onClick={onBtnSearchClick}
        >
          {languageData[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptInput;
