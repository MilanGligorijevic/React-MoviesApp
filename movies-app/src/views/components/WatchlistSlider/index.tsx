import React, { useEffect } from "react";
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import { useWatchlist } from "../../../context/watchlistContext";

function WatchlistSlider(){
    const watchlist =  useWatchlist();
    console.log(watchlist);

    return (
        <>
            <div className='flex flex-col'>
                <div className='watchlist_slider-title w-5/6 self-center mt-5 mb-1'>
                    <Link to="/watchlist">From your Watchlist</Link>
                </div>
            {watchlist.watchlist.length>0 ? 
            <div className='watchlist_slider-text mb-3 w-5/6 self-center'>Pick what you want to watch next</div>
                :
            <div className='watchlist_slider-text mb-3 w-5/6 self-center'>Add movies and shows you would like to track</div>
            }

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
                {watchlist.watchlist.map((item: any) => {
                    return <SwiperSlide key={item.id}>
                        <Link to={`/${item.mediaType}/${item.id}`} className='trending_show_slide rounded relative'>
                            <img className="rounded" src={item.backgroundPath} alt='trending show' />
                            <div className='trending_show-info flex flex-col  justify-center absolute left-5 bottom-2'>
                                <div className='trending_show-title'>{item.title}</div>
                                <div className='trending_show-release'>{item.releaseDate.slice(0, 4)}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}

export default WatchlistSlider;