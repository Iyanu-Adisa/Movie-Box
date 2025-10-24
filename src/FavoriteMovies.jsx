import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { fetchMovieDetails } from "./api";
import { FaChevronRight } from "react-icons/fa";

const FavoriteMovies = () => {
  const { likedMovies, toggleLike } = useGlobalContext();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const likedIds = Object.keys(likedMovies).filter((id) => likedMovies[id]);

  useEffect(() => {
    const getLikedMovies = async () => {
      if (likedIds.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      // Fetch movie details for each liked ID
      const likedData = await Promise.all(
        likedIds.map((id) => fetchMovieDetails(id))
      );

      setMovies(likedData);
      setLoading(false);
    };

    getLikedMovies();
  }, [likedMovies]);

  if (loading) return <p className="loading-text">Loading liked movies...</p>;

  return (
    <section className="liked-movies">
      <div className="section-header">
        <h2>Favorite Movies</h2>
      </div>

      {movies.length === 0 ? (
        <p className="no-liked-text">You haven’t liked any movies yet.</p>
      ) : (
        <div className="movie-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-pic"
                loading="lazy"
              />

              <div
                className={`love-icon-container ${
                  likedMovies[movie.id] ? "liked" : ""
                }`}
                onClick={() => toggleLike(movie.id)}
              >
                <img
                  src="/Icons/love-icon.svg"
                  alt="love-icon"
                  className="love-icon"
                />
              </div>

              <p className="movie-year">{movie.release_date?.slice(0, 4)}</p>
              <h3 className="movie-title">{movie.title}</h3>

              <div className="movie-rating">
                <div className="icn">
                  <img
                    src="/Images/IMDb.png"
                    alt="IMDb"
                    className="imdb-icon"
                  />
                  {movie.vote_average
                    ? `${movie.vote_average.toFixed(1)}/10`
                    : "N/A"}
                </div>

                <div className="icn">
                  <img
                    src="/Images/Orange.png"
                    alt="Rotten"
                    className="orange-icon"
                  />
                  {movie.vote_count ? `${movie.vote_count}` : "N/A"}
                </div>
              </div>

              <Link to={`/movie/${movie.id}`} className="details-link">
                View Details
                <FaChevronRight className="details-icon" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteMovies;
