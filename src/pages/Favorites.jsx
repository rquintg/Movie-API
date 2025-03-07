import {useMovieContext} from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";
import '../css/Favorites.css'
import {useState} from "react";
import {getMovieTrailers} from "../services/api.js";
import ModalMovieCard from "../components/ModalMovieCard.jsx";

function Favorites() {

    const [trailer, setTrailer] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModalInfo, setShowModalInfo] = useState(false);

    const {favorites} = useMovieContext();

    const handleWatchTrailer = async (movieId) => {
        try {
            const trailerData = await getMovieTrailers(movieId);
            setTrailer(trailerData);
            setShowTrailer(true);
        } catch (error) {
            console.error(error);
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

    if(favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>Favorite Movies</h2>
                <div className="movies-grid">
                    {favorites.map((movie) =>
                        (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onShowModalInfo={() => handleShowModalInfo(movie)}
                            />
                        )
                    )}
                </div>

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

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
    );
}

export default Favorites;