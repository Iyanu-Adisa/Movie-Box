import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "./api";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    getMovie();
  }, [id]);

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
          <h1 className="details-title">Title: {movie.title}</h1>
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
    </div>
  );
};

export default MovieDetails;
