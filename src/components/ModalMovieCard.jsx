import {useEffect, useState} from "react";
import {getGenres, getMovieCredits, getMovieDetails} from "../services/api.js";

import '../css/MovieCard.css';


function ModalMovieCard ({movie, onWatchTrailer, onCloseModal}) {

    const [genres, setGenres] = useState([]);
    const [credits, setCredits] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genresData = await getGenres();
            setGenres(genresData)
        }

        async function fetchCredits() {
            const creditsData = await getMovieCredits(movie.id);
            setCredits(creditsData);
        }

        async function fetchDetails() {
            const detailsData = await getMovieDetails(movie.id);
            setDetails(detailsData);
        }

        fetchGenres();
        fetchCredits();
        fetchDetails();
    }, [movie.id]);

    function getGenreNames(genreIds) {
        return genreIds.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? genre.name : null;
        }).filter(name => name).join(', ');
    }

    function getActorNames(credits) {
        return credits.slice(0,3).map((actor, index) => (
            <div key={index}>
                {actor.name} AS  <span className="character-name"> {actor.character}</span>
            </div>
        ));
    }

    function getHoursAndMinutes(runtime) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    return (
        <div className="modal fade show modal-overlay" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="">
                        <h5 className="movie-info-header">
                            {movie.title}
                            <p className="rating-select">Rating: {movie.vote_average.toFixed(1)}</p>
                        </h5>

                    </div>
                    <div className="modal-body">
                        <div className=" modal-poster">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        </div>
                        <div className="modal-info">
                            <p><b>Description:</b> {movie.overview}</p>
                            <div className="movie-details">
                                <p>Release date: <b>{movie.release_date?.split("-")[0]}</b></p>
                                <p>Runtime: <b>{getHoursAndMinutes(details.runtime)}</b></p>
                            </div>
                            {genres && genres.length > 0 && (
                                <p><b>Genres:</b> {getGenreNames(movie.genre_ids)}</p>)
                            }

                            {credits && credits.length > 0 && (
                                <p><b>Cast:</b>
                                    {getActorNames(credits)}
                                </p>)
                            }

                            <button
                                className="btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 "
                                onClick={onWatchTrailer}> Watch Trailer
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3"
                                onClick={onCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalMovieCard;