import {useMovieContext} from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";
import '../css/Favorites.css'

function Favorites() {

    const {favorites} = useMovieContext();

    if(favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>Favorite Movies</h2>
                <div className="movies-grid">
                    {favorites.map((movie) =>
                        (
                            <MovieCard key={movie.id} movie={movie}/>
                        )
                    )}
                </div>
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