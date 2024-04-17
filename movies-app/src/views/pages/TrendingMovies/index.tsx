import React from 'react'
import './css/style.scss'
import { usePopularMovies } from '../../../context/moviesContext'
import MoviePreview from '../../components/MoviePreview';
import Movie from '../../../types/movie';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

function TrendingMovies() {
    const popularMovies = usePopularMovies();
    return (
        <div className='trending_movies_main'>
            <Navbar />
            <div className='trending_movies_container flex-col ml-20 mt-10 mb-10'>
                <div>
                    <div className='trending_movies-title'>Trending movies</div>
                    <div className='trending_movies-text'>Most popular movies right now</div>
                </div>
                <div className='flex flex-wrap gap-3 mt-5'>
                    {popularMovies.map((movie: Movie) => {
                        return <MoviePreview key={movie.id} {...movie} />
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TrendingMovies