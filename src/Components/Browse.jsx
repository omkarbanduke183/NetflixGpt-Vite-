import useNowPLayingMovies from "../Hooks/useNowPlayingHook";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondContainer from "./SecondaryContainer";

const Browse = () => {
useNowPLayingMovies()
  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondContainer/>
    </div>
  );
};

export default Browse;
