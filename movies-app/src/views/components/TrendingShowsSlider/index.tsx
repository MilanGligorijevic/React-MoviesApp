import React from 'react';
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { usePopularShows } from '../../../context/tvShowsContext';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerDesktopScreen, smallerTabletScreen, tabletScreen } from '../../../utilities/screenSizes';


function TrendingShowsSlider() {
    const popularShows = usePopularShows();

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
                <div className='trending_shows_slider-title w-5/6 self-center mt-5 mb-1 sm:text-2xl'>
                    <Link to="/trendingshows">Trending shows</Link>
                </div>
                <div className='trending_shows_slider-text mb-3 w-5/6 self-center'>Most popular shows right now</div>
            </div>
            <Swiper
                className='w-5/6 mb-7'
                spaceBetween={10}
                slidesPerView={isSmallMobile ? 1 : isSmallerTablet ? 2 : isTablet ? 3 : isSmallerDesktop ? 4 : 5}
                navigation={true}
                modules={[Navigation]}
            >
                {popularShows.map((show) => {
                    return <SwiperSlide key={show.id}>
                        <Link to={`/show/${show.id}`} className='trending_show_slide rounded'>
                            <img className="rounded" src={show.backgroundPath} alt='trending show' />
                            <div className='trending_show-info flex flex-col  justify-center absolute left-5 bottom-2'>
                                <div className='trending_show-title'>{show.title}</div>
                                <div className='trending_show-release'>{show.releaseDate.slice(0, 4)}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}

export default TrendingShowsSlider;