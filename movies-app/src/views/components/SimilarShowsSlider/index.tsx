import React, { useEffect, useState } from 'react';
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Show from '../../../types/show';
import Genre from '../../../types/genre';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerDesktopScreen, tabletScreen, smallerTabletScreen } from '../../../utilities/screenSizes';

interface SimilarShowsSliderProps {
    id?: number,
    genres?: Genre[],
}

function SimilarShowsSlider({ id, genres }: SimilarShowsSliderProps) {

    const [similarShows, setSimilarShows] = useState<Show[]>();

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


    useEffect(() => {
        const optionsShows = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv',
            params: {
                language: 'en-US',
                page: '1',
                with_genres: genres && genres[0].id,
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTA2YWFmOWNkMjE1ZWMwMjZjYTY5OTBlMjE2NDQ4ZiIsInN1YiI6IjY2MDQ0NGQyMDQ3MzNmMDE0YWU4NWYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BWiPQiJfB-kVLufmhb-dwWewyLYfisJfxBAzmxV89GA'
            }
        };


        async function fetchShowsData() {
            const { data } = await axios.request(
                optionsShows
            );
            const dataShows: Show[] = [];
            data.results.map((show: any) => {
                const newShow: Show = {
                    id: show.id,
                    title: show.name,
                    overview: show.overview,
                    genres: show.genres,
                    releaseDate: show.release_date,
                    posterPath: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
                    backgroundPath: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`
                }
                return dataShows.push(newShow);
            })
            setSimilarShows(dataShows);
        }

        fetchShowsData();


    }, [genres])

    return (
        <>
            <div className='flex flex-col mt-8'>
                <div className='similar_shows_slider-text mb-3 w-5/6 self-center sm:text-2xl'>People also watched</div>
            </div>
            <Swiper
                className='w-5/6 mb-10'
                spaceBetween={10}
                slidesPerView={isSmallMobile ? 1 : isSmallerTablet ? 2 : isTablet ? 3 : isSmallerDesktop ? 4 : 5}
                navigation={true}
                modules={[Navigation]}
            >
                {similarShows?.filter((show) => {
                    return show.id !== id;
                }).map((show) => {
                    return <SwiperSlide key={show.id}>
                        <Link to={`/show/${show.id}`} className='similar_show_slide rounded relative'>
                            <img className="rounded" src={show.backgroundPath} alt='similar show' />
                            <div className='similar_show-title w-36 absolute bottom-3 left-3'>{show.title}</div>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}

export default SimilarShowsSlider