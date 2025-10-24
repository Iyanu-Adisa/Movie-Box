import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails, fetchMovieCasts } from "./api";
import { useGlobalContext } from "./context";

import {
  FaArrowLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { likedMovies, toggleLike } = useGlobalContext();

  const castContainerRef = useRef(null);

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(id);
      const castData = await fetchMovieCasts(id);
      const filtered = castData.filter((actor) => actor.profile_path);
      setMovie(data);
      setCast(filtered.slice(0, 15));
      setLoading(false);
    };
    getMovie();
  }, [id]);

  useEffect(() => {
    const container = castContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft
      );
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [cast]);

  const handleScroll = (direction) => {
    const container = castContainerRef.current;
    const scrollAmount = 300;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return <p className="loading-text">Loading movie details...</p>;
  if (!movie) return <p className="error-text">Movie not found...</p>;

  return (
    <div className="movie-details-page">
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="movie-details-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="details-poster"
        />

        <div className="details-info">
          <h1 className="details-title">
            {movie.title}
            <span
              className={`details-like-btn-inline ${
                likedMovies[movie.id] ? "liked" : ""
              }`}
              onClick={() => toggleLike(movie.id)}
            >
              <img
                src="/Icons/love-icon.svg"
                alt="like icon"
                className="details-like-icon"
              />
            </span>
          </h1>
          <p className="details-sub">Release Date: {movie.release_date}</p>
          <p className="details-sub">Runtime: {movie.runtime} mins</p>
          <p className="details-sub">
            Genre: {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="details-sub">
            Rating: <FaStar className="icon star" />{" "}
            {movie.vote_average.toFixed(1)} / 10
          </p>

          <div className="details-overview">
            <h3>Overview:</h3>
            <p>{movie.overview}</p>
          </div>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-link"
            >
              Visit Official Page
            </a>
          )}
        </div>
      </div>

      {/* 🎭 CAST SECTION */}
      <div className="movie-cast-section">
        <h2>Cast</h2>

        <div className="cast-wrapper">
          {canScrollLeft && (
            <button
              className="cast-btn left"
              onClick={() => handleScroll("left")}
            >
              <FaChevronLeft />
            </button>
          )}

          <div className="cast-container" ref={castContainerRef}>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <div key={actor.id} className="cast-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="cast-img"
                  />
                  <p className="actor-name">{actor.name}</p>
                  <p className="character-name">{actor.character}</p>
                </div>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </div>

          {canScrollRight && (
            <button
              className="cast-btn right"
              onClick={() => handleScroll("right")}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
