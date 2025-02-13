import {useEffect, useState} from "react";
import {getGenres} from "../services/api.js";

import '../css/MovieCard.css';


function ModalMovieCard ({movie, onWatchTrailer, onCloseModal}) {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genresData = await getGenres();
            setGenres(genresData)
        }

        fetchGenres();
    }, [movie.id]);

    function getGenreNames(genreIds) {
        return genreIds.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? genre.name : null;
        }).filter(name => name).join(', ');
    }

    return (
        <div className="modal fade show modal-overlay" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="">
                        <h5 className="modal-title  movie-info-header">
                            {movie.title}
                            <p className="rating-select">Rating: {movie.vote_average.toFixed(1)}</p>
                        </h5>

                    </div>
                    <div className="modal-body">
                        <div className=" modal-poster">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        </div>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        {genres && genres.length > 0 && (
                            <p>Genres: {getGenreNames(movie.genre_ids)}</p>)
                        }

                        <button className="btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 " onClick={onWatchTrailer}> Watch Trailer</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" onClick={onCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalMovieCard;