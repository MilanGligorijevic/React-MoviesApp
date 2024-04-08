import React from 'react'
import Navbar from '../../components/Navbar'
import TrendingMoviesSlider from '../../components/TrendingMoviesSlider'
import Footer from '../../components/footer'
import TrendingShowsSlider from '../../components/TrendingShowsSlider'
import HeroSection from '../../components/HeroSection'

function Home() {
    return (
        <div className='home_main'>
            <Navbar />
            <HeroSection />
            <TrendingMoviesSlider />
            <TrendingShowsSlider />
            <Footer />
        </div>
    )
}

export default Home