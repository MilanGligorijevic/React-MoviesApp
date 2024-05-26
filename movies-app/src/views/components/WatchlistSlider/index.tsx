import React, { useEffect, useState } from "react";
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import { useWatchlist } from "../../../context/watchlistContext";
import { useCurrentUser } from "../../../context/usersContext";
import { useMediaQuery } from "@mui/material";
import { smallMobileScreen, smallerDesktopScreen, smallerTabletScreen, tabletScreen } from "../../../utilities/screenSizes";
import LoadingCircle from "../LoadingCircle";

function WatchlistSlider() {
    const watchlist = useWatchlist();
    const currentUser = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (watchlist) {
            setIsLoading(false);
        }
    }, [watchlist])

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
                <div className='watchlist_slider-title w-5/6 self-center mt-5 mb-1 sm:text-2xl'>
                    {currentUser.user ?
                        <Link to="/watchlist">From your Watchlist</Link>
                        :
                        <Link to="/login">From your Watchlist</Link>
                    }
                </div>
                {currentUser.user ?
                    ''
                    :
                    <div className='watchlist_slider-text mb-10 w-5/6 self-center'><span className="font-semibold">Sign in to access your watchlist</span></div>
                }
                {currentUser.user && <>
                    {watchlist.watchlist?.length > 0 ?
                        <div className='watchlist_slider-text mb-3 w-5/6 self-center'>Pick what you want to watch next</div>
                        :
                        <div className='watchlist_slider-text mb-3 w-5/6 self-center'>Add movies and shows you would like to track</div>
                    }
                </>}
            </div>
            {isLoading ? <LoadingCircle /> : <>
                {currentUser.user && <Swiper
                    className='w-5/6 mb-10'
                    spaceBetween={10}
                    slidesPerView={isSmallMobile ? 1 : isSmallerTablet ? 2 : isTablet ? 3 : isSmallerDesktop ? 4 : 5}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {watchlist.watchlist?.map((item: any) => {
                        return <SwiperSlide key={item.id}>
                            <Link to={`/${item.mediaType}/${item.id}`} className='trending_show_slide rounded'>
                                <img className="rounded" src={item.backgroundPath} alt='trending show' />
                                <div className='trending_show-info flex flex-col  justify-center absolute left-5 bottom-2'>
                                    <div className='trending_show-title'>{item.title}</div>
                                    <div className='trending_show-release'>{item.releaseDate.slice(0, 4)}</div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    })}
                </Swiper>}
            </>}
        </>
    )
}

export default WatchlistSlider;