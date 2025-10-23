import { Routes, Route, useLocation } from "react-router-dom";
import Popular from "./Popular";
import FeaturedCasts from "./FeaturedCasts";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Header from "./Header";
import MovieDetails from "./MovieDetails";
import Trending from "./Trending";
import TopRated from "./TopRated";

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
              {/* <FeaturedCasts /> */}
            </>
          }
        />
        <Route path="/popular" element={<Popular />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/topRated" element={<TopRated />} />
        <Route path="/casts" element={<FeaturedCasts />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
