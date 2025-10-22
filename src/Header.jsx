import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
            placeholder="What do you want to watch?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue === "" && (
            <img src="/Icons/Icon.svg" alt="search-icon" />
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
            to="/arrival"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            New Arrivals
          </NavLink>
          <NavLink
            to="/exclusive"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Exclusive
          </NavLink>
          <NavLink
            to="/casts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Casts
          </NavLink>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          <FiMenu size={26} />
        </button>
      </header>

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
        <NavLink to="/arrival" onClick={toggleMenu}>
          New Arrivals
        </NavLink>
        <NavLink to="/exclusive" onClick={toggleMenu}>
          Exclusive
        </NavLink>
        <NavLink to="/casts" onClick={toggleMenu}>
          Casts
        </NavLink>
      </div>

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;
