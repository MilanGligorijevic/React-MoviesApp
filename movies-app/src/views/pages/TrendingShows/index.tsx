import React from 'react'
import './css/style.scss'
import { usePopularShows } from '../../../context/tvShowsContext'
import ShowPreview from '../../components/ShowPreview'
import Show from '../../../types/show'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes'
import { useMediaQuery } from '@mui/material'
import NavbarMobile from '../../components/NavbarMobile'

function TrendingShows() {
    const popularShows = usePopularShows();

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );

    return (
        <div className='trending_shows_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='ml-20 mt-10 mb-10 flex-col sm:mx-5 sm:mt-5 s:mx-5'>
                <div>
                    <div className='trending_shows-title sm:text-2xl'>Trending shows</div>
                    <div className='trending_shows-text sm:text-base'>Most popular shows right now</div>
                </div>
                <div className='flex flex-wrap gap-3 mt-5 sm:gap-4'>
                    {popularShows.map((show: Show) => {
                        return <ShowPreview key={show.id} {...show} />
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TrendingShows




