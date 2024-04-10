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

interface SimilarShowsSliderProps {
    id?: number,
    genres?: Genre[],
}

function SimilarShowsSlider({ id, genres }: SimilarShowsSliderProps) {

    const [similarShows, setSimilarShows] = useState<Show[]>();
    console.log(genres && genres[0].id)
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
                <div className='similar_shows_slider-text mb-3 w-5/6 self-center'>People also watched</div>
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