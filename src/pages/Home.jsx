import {useState, useEffect} from "react";
import {getPopularMovies, searchMovies, getMovieTrailers} from "../services/api.js";
import MovieCard from "../components/MovieCard.jsx";
import ModalMovieCard from "../components/ModalMovieCard.jsx";

import '../css/Home.css'


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModalInfo, setShowModalInfo] = useState(false);


    useEffect(() => {
        async function fetchPopularMoviesData() {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("Error loading movies");
            } finally {
                setLoading(false);
            }
        }


        if (movies) {
            fetchPopularMoviesData();
        }
    }, []);

    if (!movies) return null;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);

        } catch (error) {
            console.error(error);
            setError("Error searching movies");
        } finally {
            setLoading(false);
        }
    }

    const handleWatchTrailer = async (movieId) => {
        try {
            const trailerData = await getMovieTrailers(movieId);
            setTrailer(trailerData);
            setShowTrailer(true);
        } catch (error) {
            console.error(error);
            setError("Error loading trailer");
        }
    }

    const handleCloseTrailer = () => {
        setShowTrailer(false);
        setTrailer(null);
    };

    const handleShowModalInfo = (movieId) => {
        setSelectedMovie(movieId);
        setShowModalInfo(true);
    }

    const handleCloseModalInfo = () => {
        setShowModalInfo(false);
        setSelectedMovie(null);
    }

    return (
        <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input type="text"
                       placeholder="Search for a movie..."
                       className="search-input"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button type="submit" className="search-buttom">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading">Loading...</div>) : (
                <div className="movies-grid">
                    {movies.map((movie) =>
                        (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onShowModalInfo={() => handleShowModalInfo(movie)}
                            />
                        )
                    )}
                </div>
            )}

            {showTrailer && trailer && (
                <div className="trailer-modal">
                    <div className="trailer-content">
                        <button className="close-trailer-btn" onClick={handleCloseTrailer}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {showModalInfo && selectedMovie && (
                <ModalMovieCard movie={selectedMovie}
                                onWatchTrailer={() => handleWatchTrailer(selectedMovie.id)}
                                onCloseModal={handleCloseModalInfo}
                />
            )}

        </div>
    )
}

export default Home;