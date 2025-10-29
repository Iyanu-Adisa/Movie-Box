import React, { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchMovieTeaser } from "./api";
import { FaPlay, FaTimes } from "react-icons/fa";

const HomePage = () => {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTrendingMovie = async () => {
      try {
        const trending = await fetchTrendingMovies();
        if (trending && trending.length > 0) {
          const randomMovie =
            trending[Math.floor(Math.random() * trending.length)];
          setMovie(randomMovie);

          const trailerKey = await fetchMovieTeaser(randomMovie.id);
          setVideoKey(trailerKey);
        }
      } catch (error) {
        console.error("Error loading homepage movie:", error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovie();
  }, []);

  if (loading)
    return (
      <section className="hero hero-loading">
        <p>Loading trending movie...</p>
      </section>
    );

  if (!movie)
    return (
      <section className="hero hero-error">
        <p>Could not load trending movie</p>
      </section>
    );

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="trending-label">Trending Now!</p>
        <h1 className="hero-title">{movie.title}</h1>

        <div className="rating">
          <img src="/Images/IMDb.png" alt="IMDb" className="imdb-icon" />{" "}
          {movie.vote_average?.toFixed(1)} / 10
          <span> • {movie.release_date?.slice(0, 4)}</span>
        </div>

        <p className="description">
          {movie.overview?.length > 220
            ? movie.overview.slice(0, 220) + "..."
            : movie.overview}
        </p>

        {videoKey && (
          <button
            className="cta-btn trailer-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="play-icon">
              <FaPlay />
            </span>
            Watch Trailer
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Movie Teaser"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
