import React from 'react';
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { usePopularMovies } from '../../../context/moviesContext';
import { Link } from 'react-router-dom';


function TrendingMoviesSlider() {
    const popularMovies = usePopularMovies();
    return (
        <>
            <div className='flex flex-col'>
                <div className='trending_movies_slider-title w-5/6 self-center'>
                    <Link to="/trendingmovies">Trending movies</Link>
                </div>
                <div className='trending_movies_slider-text mb-3 w-5/6 self-center'>Most popular movies right now</div>
            </div>
            <Swiper
                className='w-5/6 mb-7'
                spaceBetween={10}
                slidesPerView={5}
                navigation={true}
                modules={[Navigation]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper: any) => console.log(swiper)}
            >
                {popularMovies.map((movie) => {
                    return <SwiperSlide key={movie.id}>
                        <Link to={`/movie/${movie.id}`} className='trending_movie_slide rounded relative'>
                            <img className="rounded" src={movie.backgroundPath} alt='trending movie' />
                            <div className='trending_movie-info flex flex-col  justify-center '>
                                <div className='trending_movie-title'>{movie.title}</div>
                                <div className='trending_movie-release'>{movie.releaseDate.slice(0, 4)}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}

export default TrendingMoviesSlider