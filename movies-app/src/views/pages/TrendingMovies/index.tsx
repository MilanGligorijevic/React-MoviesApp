import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { usePopularMovies } from '../../../context/moviesContext'
import MoviePreview from '../../components/MoviePreview';
import Movie from '../../../types/movie';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import NavbarMobile from '../../components/NavbarMobile';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes';
import LoadingCircle from '../../components/LoadingCircle';

function TrendingMovies() {
    const popularMovies = usePopularMovies();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (popularMovies) {
            setIsLoading(false);
        }
    }, [popularMovies])

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );



    return (
        <div className='trending_movies_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }

            <div className='trending_movies_container flex-col ml-20 mt-10 mb-10 sm:mx-5 sm:mt-5 s:mx-5'>
                <div>
                    <div className='trending_movies-title sm:text-2xl'>Trending movies</div>
                    <div className='trending_movies-text sm:text-base'>Most popular movies right now</div>
                </div>
                {isLoading ? <LoadingCircle /> : <div className='flex flex-wrap gap-3 mt-5'>
                    {popularMovies.map((movie: Movie) => {
                        return <MoviePreview key={movie.id} {...movie} />
                    })}
                </div>}
            </div>

            <Footer />
        </div>
    )
}

export default TrendingMovies