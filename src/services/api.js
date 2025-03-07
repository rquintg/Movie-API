
export const getPopularMovies = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const getMovieTrailers = async (movieId) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
}

export const getGenres = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data.genres;
}

export const getMovieCredits = async (movieId) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data.cast;
}

export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`);
    return await response.json();
}

export const getReleaseDates = async (movieId) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/release_dates?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const getWatchProviders = async (movieId) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/watch/providers?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data.results.US;
}