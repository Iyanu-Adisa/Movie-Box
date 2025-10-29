import MovieSection from "./MovieSection";
import { fetchTopRatedMovies } from "./api";

const TopRated = () => (
  <MovieSection
    title="Top Rated Movies"
    fetchFunction={fetchTopRatedMovies}
    seeMorePath="/topRated"
    showRank={true}
  />
);

export default TopRated;
