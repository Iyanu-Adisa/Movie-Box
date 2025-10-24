import { Routes, Route, useLocation } from "react-router-dom";
import Popular from "./Popular";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Header from "./Header";
import MovieDetails from "./MovieDetails";
import Trending from "./Trending";
import TopRated from "./TopRated";
import FavoriteMovies from "./FavoriteMovies";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/movie/");

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <Trending />
              <Popular />
              <TopRated />
            </>
          }
        />
        <Route path="/popular" element={<Popular />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/topRated" element={<TopRated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorite" element={<FavoriteMovies />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
