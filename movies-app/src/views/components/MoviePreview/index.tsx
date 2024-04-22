import React from 'react'
import './css/style.scss'
import Movie from '../../../types/movie'
import { Link } from 'react-router-dom'

function MoviePreview({ id, title, overview, genres, releaseDate, posterPath }: Movie) {
    return (
        <div className='movie_preview w-52 rounded sm:w-40'>
            <Link to={`/movie/${id}`}>
                <img className="rounded" src={posterPath} alt="movie preview" />
                <div className='movie_preview_title mt-1 sm:hidden'>{title}</div>
                <div className='movie_preview_release_date sm:hidden'>{releaseDate.slice(0, 4)}</div>
            </Link>
        </div>
    )
}

export default MoviePreview