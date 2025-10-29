import MovieSection from "./MovieSection";
import { fetchTrendingMovies } from "./api";

const Trending = () => (
  <MovieSection
    title="Trending Movies"
    fetchFunction={fetchTrendingMovies}
    seeMorePath="/trending"
  />
);

export default Trending;
