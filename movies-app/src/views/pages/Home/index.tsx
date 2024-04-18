import React from 'react'
import Navbar from '../../components/Navbar'
import TrendingMoviesSlider from '../../components/TrendingMoviesSlider'
import Footer from '../../components/footer'
import TrendingShowsSlider from '../../components/TrendingShowsSlider'
import HeroSection from '../../components/HeroSection'
import WatchlistSlider from '../../components/WatchlistSlider'
import { useMediaQuery } from '@mui/material'
import { smallMobileScreen } from '../../../utilities/screenSizes'
import NavbarMobile from '../../components/NavbarMobile'

function Home() {
    //za potrebe media query
    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
      );

    return (
        <div className='home_main'>
            {isSmallMobile ? 
            <NavbarMobile/>
                :
            <Navbar/>    
            }
            <HeroSection />
            <TrendingMoviesSlider />
            <TrendingShowsSlider />
            <WatchlistSlider />
            <Footer />
        </div>
    )
}

export default Home