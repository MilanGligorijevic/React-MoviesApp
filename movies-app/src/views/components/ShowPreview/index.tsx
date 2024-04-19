import React from 'react'
import './css/style.scss'
import Show from '../../../types/show'
import { Link } from 'react-router-dom'

function ShowPreview({ id, title, overview, genres, releaseDate, posterPath }: Show) {
    return (
        <div className='show_preview w-52 rounded sm:w-36'>
            <Link to={`/show/${id}`}>
                <img className="rounded" src={posterPath} alt="show preview" />
                <div className='show_preview_title mt-1 sm:hidden'>{title}</div>
                <div className='show_preview_release_date sm:hidden'>{releaseDate.slice(0, 4)}</div>
            </Link>
        </div>
    )

}

export default ShowPreview