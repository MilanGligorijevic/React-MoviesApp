import React from 'react'
import './css/style.scss'
import SearchResult from '../../../types/searchResult'
import { Link } from 'react-router-dom'
import { MovieIcon } from '../../../assets/svg/MovieIcon';
import { TVShowIcon } from '../../../assets/svg/TVShowIcon';

function SearchResultPreview({ id, title, overview, genres, releaseDate, posterPath, mediaType }: SearchResult) {
    const mediaTypeUrl = mediaType === 'movie' ? 'movie' : 'show';

    return (
        <div className='search_result_preview w-52 rounded sm:w-36'>
            <Link to={`/${mediaTypeUrl}/${id}`}>
                <img className="rounded" src={posterPath} alt="movie preview" />
                <div className=''>{mediaType === 'movie' ? <MovieIcon /> : <TVShowIcon />}</div>
                <div className='search_result_preview_title sm:hidden'>{title}</div>
                <div className='search_result_preview_release_date sm:hidden'>{releaseDate?.slice(0, 4)}</div>
                {/* <div className='search_result_preview_media_type flex items-center'> {mediaType === 'movie' ? <MovieIcon /> : <TVShowIcon />} {mediaType}</div> */}
            </Link>
        </div>
    )
}

export default SearchResultPreview