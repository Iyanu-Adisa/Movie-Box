import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ❤️ Liked Movies
  const [likedMovies, setLikedMovies] = useState(() => {
    const saved = localStorage.getItem("likedMovies");
    return saved ? JSON.parse(saved) : {};
  });

  // 🌙 Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("moviebox-theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("moviebox-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleLike = (id) => {
    setLikedMovies((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      return updated;
    });
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        likedMovies,
        toggleLike,
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
