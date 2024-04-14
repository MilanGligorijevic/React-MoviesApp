import React from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { useWatchlist } from '../../../context/watchlistContext'

function Watchlist() {
    const watchlist = useWatchlist();

    return (
        <div>
            <Navbar />
            <div>{watchlist.map((item) => {
                return item.title;
            })}</div>
            <Footer />
        </div>
    )
}

export default Watchlist