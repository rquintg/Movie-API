import {useEffect, useState} from "react";
import {useMovieContext} from "../contexts/MovieContext.jsx";
import {getGenres} from "../services/api.js";

import '../css/MovieCard.css'


function MovieCard({movie, onWatchTrailer}){
    const {addFavorites, removeFromFavorites, isFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genresData = await getGenres();
            setGenres(genresData)
        }

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
                <p>{truncateOverview(movie.overview, 100)}</p>
                <p>Release date: <b>{movie.release_date?.split("-")[0]}</b></p>
                {genres && genres.length > 0 && (
                    <p>Genres: {getGenreNames(movie.genre_ids)}</p> )
                }

                    <button className="watch-trailer-btn" onClick={onWatchTrailer}> Watch Trailer </button>

            </div>

        </div>
    )
}

export default MovieCard;