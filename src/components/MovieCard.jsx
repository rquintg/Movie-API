import {useEffect, useState} from "react";
import {useMovieContext} from "../contexts/MovieContext.jsx";
import {getMovieTrailers, getGenres} from "../services/api.js";

import '../css/MovieCard.css'


function MovieCard({movie}){
    const {addFavorites, removeFromFavorites, isFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id);
    const [trailer, setTrailer] = useState(null);
    const [genres, setGenres] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        async function fetchTrailer() {
            const trailerData = await getMovieTrailers(movie.id);
            setTrailer(trailerData);
        }

        async function fetchGenres() {
            const genresData = await getGenres();
            setGenres(genresData)
        }

        fetchTrailer();
        fetchGenres();
    }, [movie.id]);

    function onFavoriteClick(e){
        e.preventDefault();
        if(favorite) removeFromFavorites(movie.id);
        else addFavorites(movie);
    }

    function truncateOverview(overview, limit){
        if(overview.length > limit){
            return overview.substring(0, limit) + "...";
        }
        return overview;
    }

    function onWatchTrailerClick() { setShowTrailer(true); }
    function onCloseTrailerClick() { setShowTrailer(false); }

    function getGenreNames(genreIds) {
        return genreIds.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? genre.name : null;
        }).filter(name => name).join(', ');
    }

    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-ocverlay">
                    <button className={`favorite-btn ${favorite ? "active" : "" }`} onClick={onFavoriteClick}>
                        ♥︎
                    </button>
                </div>
            </div>
            <div className="movie-info-header">
                <h3>{movie.title}</h3>
                <p className="rating-select">Rating: {movie.vote_average.toFixed(1)}</p>
            </div>
            <div className="movie-info">
                <p>{truncateOverview(movie.overview, 150)}</p>
                <p>Release date: <b>{movie.release_date?.split("-")[0]}</b></p>
                {genres && genres.length > 0 && (
                    <p>Genres: {getGenreNames(movie.genre_ids)}</p> )
                }
                {trailer && trailer.key && (
                    <button className="watch-trailer-btn" onClick={onWatchTrailerClick}> Watch Trailer </button>
                )}
            </div>
                {showTrailer && (
                    <div className="trailer-modal">
                        <div className="trailer-content">
                            <button className="close-trailer-btn" onClick={onCloseTrailerClick}>✖</button>
                            <iframe width="auto" height="315" src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                )}

        </div>
    )
}

export default MovieCard;