import { Routes, Route, useLocation } from "react-router-dom";
import Popular from "./Popular";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Header from "./Header";
import MovieDetails from "./MovieDetails";
import Trending from "./Trending";
import TopRated from "./TopRated";
import FavoriteMovies from "./FavoriteMovies";
import NotFound from "./NotFound";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/movie/");

  return (
    <>
      <main className="full-page">
        {!hideHeader && <Header />}

        <div className="half-page">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default App;
