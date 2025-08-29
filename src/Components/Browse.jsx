import { useSelector } from "react-redux";
import useNowPlayingMovies from "../Hooks/useNowPlayingHook";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import GptComponent from "./GptComponent";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondContainer from "./SecondaryContainer";

const Browse = () => {
  const { loading, movies } = useNowPlayingMovies();
  const isGptVisible = useSelector((store) => store.gpt.isGptVisible);
  usePopularMovies();
  useTopRatedMovies();

  if (loading) return <h1>Loading movies</h1>;
  return (
    <div>
      <Header />
      {isGptVisible ? (
        <GptComponent />
      ) : (
        <>
          <MainContainer />
          <SecondContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
