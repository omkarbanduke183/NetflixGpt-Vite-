import useNowPlayingMovies from "../Hooks/useNowPlayingHook";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondContainer from "./SecondaryContainer";

const Browse = () => {
  const { loading, movies } = useNowPlayingMovies();

  if (loading) return <h1>Loading movies</h1>;
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondContainer />
    </div>
  );
};

export default Browse;
