import React from "react";
import './css/style.scss';
import { Link } from "react-router-dom";
import { MovieIcon } from "../../../assets/svg/MovieIcon";
import { TVShowIcon } from "../../../assets/svg/TVShowIcon";
import Show from "../../../types/show";
import Movie from "../../../types/movie";
import { useWatchlist } from "../../../context/watchlistContext";
import { CloseIcon } from "../../../assets/svg/CloseIcon";

interface WatchlistItemProps {
    item: Movie | Show
}

function WatchlistItemPreview({ item }: WatchlistItemProps) {
    const watchlist = useWatchlist()

    return (
        <div className='w-52 rounded relative sm:w-40'>
            <button className="absolute top-1 right-1" onClick={() => watchlist.removeFromWatchlistAndFirebase(item)}><CloseIcon /></button>
            <Link to={`/${item.mediaType}/${item.id}`}>
                <img className="rounded" src={item.posterPath} alt={`${item.mediaType} preview`} />
                <div className='sm:hidden'>{item.mediaType === 'movie' ? <MovieIcon /> : <TVShowIcon />}</div>
                <div className='watchlist_item_preview_title mt-1 sm:hidden'>{item.title}</div>
                <div className='watchlist_item_preview_release_date sm:hidden'>{item.releaseDate.slice(0, 4)}</div>
            </Link>
        </div>
    )
}

export default WatchlistItemPreview;