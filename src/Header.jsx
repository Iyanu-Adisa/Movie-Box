import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { fetchSearchResults } from "./api";
import { useGlobalContext } from "./context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const navigate = useNavigate();
  const { likedMovies } = useGlobalContext();

  const likedCount = Object.keys(likedMovies).filter(
    (id) => likedMovies[id]
  ).length;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 🌙 Apply dark mode & persist in localStorage
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // 🔍 Live search debounce
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchValue.trim().length > 0) {
        const data = await fetchSearchResults(searchValue);
        setSearchResults(data.results || []);
      } else {
        setSearchResults([]);
      }
    }, 500);
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
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/Images/Logo.png" alt="logo" />
          </Link>
        </div>

        {/* Search Bar */}
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

          {/* Dropdown Results */}
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

        {/* Nav Links */}
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

          {/* Favorites link only shows if there’s at least one liked movie */}
          {likedCount > 0 && (
            <NavLink
              to="/favorite"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Favorites ({likedCount})
            </NavLink>
          )}

          {/* 🌙 Dark Mode Toggle */}
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <FiMenu size={26} />
        </button>
      </header>

      {/* Sidebar for mobile view */}
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

        {likedCount > 0 && (
          <NavLink to="/favorite" className="nav-link" onClick={toggleMenu}>
            Favorites ({likedCount})
          </NavLink>
        )}

        {/* Dark Mode toggle inside sidebar too */}
        <button
          className="dark-mode-toggle mobile-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      {/* Overlay for when menu is open */}
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;
