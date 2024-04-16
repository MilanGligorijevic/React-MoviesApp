import React, { useEffect } from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { useWatchlist } from '../../../context/watchlistContext'
import WatchlistItemPreview from '../../components/WatchlistItemPreview'

function Watchlist() {
    const watchlist = useWatchlist();

    return (
        <div className='watchlist_main'>
            <Navbar />
            <div className='watchlist_container flex-col ml-20 mt-10'>
                <div>
                    {watchlist.watchlist.length > 0 ? <div className='watchlist-title'>Your watchlist </div> 
                    : 
                    <div className='watchlist-title'>Your watchlist is empty</div>}
                </div>
            {watchlist.watchlist.length > 0 ? 
            <div className='flex flex-wrap gap-3 mt-5'>
                {watchlist.watchlist.map((item: any) => {
                    return <WatchlistItemPreview key={item.id} {...item}/>
                })} 
            </div>
            :    
            <div>Add movies and shows you would like to track</div>}
            </div>
            <Footer />
        </div>
    )
}

export default Watchlist