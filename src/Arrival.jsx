import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const Arrival = () => {
  const { likedMovies, toggleLike } = useGlobalContext();

  const arrivals = [
    {
      id: 5,
      title: "Dune",
      year: "USA, 2021",
      imdbRating: "84.0/100",
      percentageRating: "75%",
      genre: "Action, Adventure, Drama",
      image: "/Images/Dune.png",
    },
    {
      id: 6,
      title: "No Time To Die",
      year: "USA, 2021",
      imdbRating: "76.0/100",
      percentageRating: "68%",
      genre: "Action, Adventure, Thriller",
      image: "/Images/No-time-to-die.png",
    },
    {
      id: 7,
      title: "Shang-Chi and the Legend of the Ten Rings",
      year: "USA, 2021",
      imdbRating: "79.0/100",
      percentageRating: "75%",
      genre: "Action, Adventure, Fantasy",
      image: "/Images/Shang-chi.png",
    },
    {
      id: 8,
      title: "Don't Breathe 2",
      year: "USA, 2021",
      imdbRating: "61.0/100",
      percentageRating: "46%",
      genre: "Action, Drama, Horror",
      image: "/Images/Don't-breathe-2.png",
    },
  ];

  return (
    <section className="arrival">
      <div className="section-header">
        <h2>New Arrival</h2>
        <Link to="/arrival">See more &gt;</Link>
      </div>

      <div className="movie-container">
        {arrivals.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.image}
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
                alt="luv-icon"
                className="love-icon"
              />
            </div>

            <p className="movie-year">{movie.year}</p>
            <h3 className="movie-title">{movie.title}</h3>

            <div className="movie-rating">
              <div className="icn">
                <img src="/Images/IMDb.png" alt="IMDb" className="imdb-icon" />
                {movie.imdbRating}
              </div>
              <div className="icn">
                <img
                  src="/Images/Orange.png"
                  alt="Rotten"
                  className="orange-icon"
                />
                {movie.percentageRating}
              </div>
            </div>

            <p className="movie-genre">{movie.genre}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Arrival;
