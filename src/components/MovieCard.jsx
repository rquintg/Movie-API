import {useMovieContext} from "../contexts/MovieContext.jsx";

import '../css/MovieCard.css'

function MovieCard({movie}){
    const {addFavorites, removeFromFavorites, isFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id);

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
            </div>
        </div>
    )
}

export default MovieCard;