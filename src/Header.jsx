import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { fetchSearchResults } from "./api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 👇 Live search as user types
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchValue.trim().length > 0) {
        const data = await fetchSearchResults(searchValue);
        setSearchResults(data.results || []);
      } else {
        setSearchResults([]);
      }
    }, 500); // debounce for smoother performance
    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const handleSelectMovie = (id) => {
    setSearchResults([]);
    setSearchValue("");
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src="/Images/Logo.png" alt="logo" />
          </Link>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue === "" && (
            <img src="/Icons/Icon.svg" alt="search-icon" />
          )}

          {/* 👇 Live search dropdown */}
          {searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.slice(0, 8).map((movie) => (
                <div
                  key={movie.id}
                  className="search-result-item"
                  onClick={() => handleSelectMovie(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="movie-info">
                    <h4>{movie.title}</h4>
                    <p>{movie.release_date?.split("-")[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="nav-right">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/popular"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Popular
          </NavLink>
          <NavLink
            to="/trending"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Trending
          </NavLink>
          <NavLink
            to="/topRated"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            TopRated
          </NavLink>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          <FiMenu size={26} />
        </button>
      </header>

      {/* sidebar and overlay stay same */}
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          <FiX size={28} />
        </button>
        <NavLink to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/popular" onClick={toggleMenu}>
          Popular
        </NavLink>
        <NavLink to="/trending" onClick={toggleMenu}>
          Trending
        </NavLink>
        <NavLink to="/topRated" onClick={toggleMenu}>
          TopRated
        </NavLink>
      </div>

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;
