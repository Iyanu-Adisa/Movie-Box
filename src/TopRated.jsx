import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "./context";
import { fetchTopRatedMovies } from "./api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopRated = () => {
  const { likedMovies, toggleLike } = useGlobalContext();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTopRatedMovies();
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading movies...</p>;
  }

  const moviesToDisplay = isHomePage
    ? movies.slice(currentIndex, currentIndex + 4)
    : movies;

  const nextSlide = () => {
    if (currentIndex + 4 < movies.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <section className="top-rated">
      <div className="section-header">
        <h2>Top Rated Movies</h2>
        {isHomePage && <Link to="/topRated">See more &gt;</Link>}
      </div>

      {isHomePage && (
        <div className="carousel-controls">
          <button
            className="carousel-btn left"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft />
          </button>
          <button
            className="carousel-btn right"
            onClick={nextSlide}
            disabled={currentIndex + 4 >= movies.length}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <div className="movie-container">
        {moviesToDisplay.map((movie, index) => {
          // Calculate the actual ranking position
          const rank = currentIndex + index + 1;

          return (
            <div key={movie.id} className="movie-card top-rated-card">
              {/* Big ranking number overlay like Netflix */}
              <div className="rank-number">{rank}</div>

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
                View Details <FaChevronRight className="details-icon" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopRated;
