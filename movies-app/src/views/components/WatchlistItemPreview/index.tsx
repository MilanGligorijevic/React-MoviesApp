import React from "react";
import './css/style.scss';
import { Link } from "react-router-dom";
import { MovieIcon } from "../../../assets/svg/MovieIcon";
import { TVShowIcon } from "../../../assets/svg/TVShowIcon";
import Show from "../../../types/show";
import Movie from "../../../types/movie";
import { useWatchlist } from "../../../context/watchlistContext";
import { CloseIcon } from "../../../assets/svg/CloseIcon";

function WatchlistItemPreview({id, posterPath, title, releaseDate, mediaType}: Movie | Show){
    const watchlist = useWatchlist()

    return (
        <div className='w-52 rounded relative'>
                <button className="absolute top-1 right-1" onClick={() => watchlist.removeFromWatchlistAndFirebase(id)}><CloseIcon /></button>
            <Link to={`/${mediaType}/${id}`}>
                <img className="rounded" src={posterPath} alt={`${mediaType} preview`} />
                <div className=''>{mediaType === 'movie' ? <MovieIcon /> : <TVShowIcon />}</div>
                <div className='watchlist_item_preview_title mt-1'>{title}</div>
                <div className='watchlist_item_preview_release_date'>{releaseDate.slice(0, 4)}</div>
            </Link>
        </div>
    )
}

export default WatchlistItemPreview;