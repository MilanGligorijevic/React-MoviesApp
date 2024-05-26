import React, { useEffect, useState } from 'react';
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { usePopularMovies } from '../../../context/moviesContext';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerDesktopScreen, smallerTabletScreen, tabletScreen } from '../../../utilities/screenSizes';
import LoadingCircle from '../LoadingCircle';


function TrendingMoviesSlider() {
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
    const isSmallerDesktop = useMediaQuery(
        `(max-width: ${smallerDesktopScreen}px)`,
    );
    const isTablet = useMediaQuery(
        `(max-width: ${tabletScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );

    return (
        <>
            <div className='flex flex-col'>
                <div className='trending_movies_slider-title w-5/6 self-center mt-10 mb-1 sm:text-2xl'>
                    <Link to="/trendingmovies">Trending movies</Link>
                </div>
                <div className='trending_movies_slider-text mb-3 w-5/6 self-center'>Most popular movies right now</div>
            </div>
            {isLoading ? <LoadingCircle /> : <Swiper
                className='w-5/6 mb-7'
                spaceBetween={10}
                slidesPerView={isSmallMobile ? 1 : isSmallerTablet ? 2 : isTablet ? 3 : isSmallerDesktop ? 4 : 5}
                navigation={true}
                modules={[Navigation]}
            >
                {popularMovies.map((movie) => {
                    return <SwiperSlide key={movie.id}>
                        <Link to={`/movie/${movie.id}`} className='trending_movie_slide rounded'>
                            <img className="rounded" src={movie.backgroundPath} alt='trending movie' />
                            <div className='trending_movie-info flex flex-col  justify-center absolute left-5 bottom-2'>
                                <div className='trending_movie-title'>{movie.title}</div>
                                <div className='trending_movie-release'>{movie.releaseDate.slice(0, 4)}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>}
        </>
    )
}

export default TrendingMoviesSlider