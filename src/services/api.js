
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