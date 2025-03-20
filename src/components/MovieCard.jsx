import {useEffect, useState} from "react";
import {getReleaseDates} from "../services/api.js";
import {useMovieContext} from "../contexts/MovieContext.jsx";

import '../css/MovieCard.css'


function MovieCard({movie, onShowModalInfo}) {
    const {addFavorites, removeFromFavorites, isFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id);

    const [releaseDates, setReleaseDates] = useState([]);

    useEffect(() => {

        async function fetchReleaseDates() {
            const releaseDatesData = await getReleaseDates(movie.id);
            setReleaseDates(releaseDatesData);
        }

        fetchReleaseDates();

    }, [movie.id]);


    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addFavorites(movie);
    }

    function truncateOverview(overview, limit) {
        if (overview.length > limit) {
            return overview.substring(0, limit) + "...";
        }
        return overview;
    }

    function getCertification(releaseDates) {
        if (!Array.isArray(releaseDates)) {
            return 'N/R';
        }
        const certification = releaseDates.find(date => date.iso_3166_1 === 'US')?.release_dates[0].certification;
        return certification ? certification : 'N/R';
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-ocverlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        <i className="bi bi-star-fill"></i>
                    </button>
                </div>
            </div>
            <div className="movie-info-header">
                <h3>{movie.title}</h3>
                <p className="rating-select">Rating: {getCertification(releaseDates)}</p>
            </div>
            <div className="movie-info">
                <p>{truncateOverview(movie.overview, 100)}</p>
                <p>Release date: <b>{movie.release_date?.split("-")[0]}</b></p>

                <button className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3"
                        onClick={onShowModalInfo}>Show Details
                </button>

            </div>

        </div>
    )
}

export default MovieCard;