const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const fetchSearchResults = async (query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const fetchMovieTeaser = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();

    const teaser = data.results.find(
      (vid) =>
        (vid.type === "Trailer" || vid.type === "Teaser") &&
        vid.site === "YouTube"
    );

    return teaser ? teaser.key : null;
  } catch (error) {
    console.error("Error fetching movie teaser:", error);
    return null;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
};

export const fetchMovieCasts = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie casts:", error);
    return [];
  }
};
