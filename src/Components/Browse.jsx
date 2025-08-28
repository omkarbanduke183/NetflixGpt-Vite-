import useNowPlayingMovies from "../Hooks/useNowPlayingHook";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondContainer from "./SecondaryContainer";

const Browse = () => {
  const { loading, movies } = useNowPlayingMovies();
  usePopularMovies()
  useTopRatedMovies()

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
