import React from 'react'
import './css/style.scss'
import { usePopularShows } from '../../../context/tvShowsContext'
import ShowPreview from '../../components/ShowPreview'
import Show from '../../../types/show'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'

function TrendingShows() {
    const popularShows = usePopularShows();
    return (
        <div className='trending_shows_main'>
            <Navbar />
            <div className='ml-20 mt-10 mb-10 flex-col'>
                <div>
                    <div className='trending_shows-title'>Trending shows</div>
                    <div className='trending_shows-text'>Most popular shows right now</div>
                </div>
                <div className='flex flex-wrap gap-3 mt-5'>
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




