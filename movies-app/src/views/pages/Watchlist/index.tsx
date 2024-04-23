import React from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { useWatchlist } from '../../../context/watchlistContext'
import WatchlistItemPreview from '../../components/WatchlistItemPreview'
import NavbarMobile from '../../components/NavbarMobile'
import { useMediaQuery } from '@mui/material'
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes'

function Watchlist() {
    const watchlist = useWatchlist();

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );

    return (
        <div className='watchlist_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='watchlist_container flex-col ml-20 mt-10 mb-10 sm:mx-5 sm:mt-5'>
                <div>
                    {watchlist.watchlist?.length > 0 ? <div className='watchlist-title sm:text-2xl'>Your watchlist </div>
                        :
                        <div className='watchlist-title mb-3 sm:text-2xl'>Your watchlist is empty</div>}
                </div>
                {watchlist.watchlist?.length > 0 ?
                    <div className='flex flex-wrap gap-3 mt-5 sm:gap-4'>
                        {watchlist.watchlist.map((item: any) => {
                            return <WatchlistItemPreview key={item.id} item={item} />
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