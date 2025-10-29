import MovieSection from "./MovieSection";
import { fetchPopularMovies } from "./api";

const Popular = () => (
  <MovieSection
    title="Popular Movies"
    fetchFunction={fetchPopularMovies}
    seeMorePath="/popular"
  />
);

export default Popular;
