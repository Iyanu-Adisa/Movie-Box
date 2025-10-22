import { Routes, Route, useLocation } from "react-router-dom";
import Arrival from "./Arrival";
import ExclusiveVideos from "./exclusiveVideos";
import Popular from "./Popular";
import FeaturedCasts from "./FeaturedCasts";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Header from "./Header";
import MovieDetails from "./MovieDetails";

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
              <Popular />
              <Arrival />
              <ExclusiveVideos />
              <FeaturedCasts />
            </>
          }
        />
        <Route path="/popular" element={<Popular />} />
        <Route path="/arrival" element={<Arrival />} />
        <Route path="/exclusive" element={<ExclusiveVideos />} />
        <Route path="/casts" element={<FeaturedCasts />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
