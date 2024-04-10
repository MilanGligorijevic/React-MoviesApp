import React from 'react'
import Navbar from '../../components/Navbar'
import TrendingMoviesSlider from '../../components/TrendingMoviesSlider'
import Footer from '../../components/footer'
import TrendingShowsSlider from '../../components/TrendingShowsSlider'
import HeroSection from '../../components/HeroSection'
import WatchlistSlider from '../../components/WatchlistSlider'

function Home() {
    return (
        <div className='home_main'>
            <Navbar />
            <HeroSection />
            <TrendingMoviesSlider />
            <TrendingShowsSlider />
            <WatchlistSlider />
            <Footer />
        </div>
    )
}

export default Home