import React, { useEffect, useState } from 'react';
import './css/style.scss';
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Movie from '../../../types/movie';
import Genre from '../../../types/genre';

interface SimilarMoviesSliderProps {
    id?: number,
    genres?: Genre[],
}

function SimilarMoviesSlider({ id, genres }: SimilarMoviesSliderProps) {

    const [similarMovies, setSimilarMovies] = useState<Movie[]>();

    useEffect(() => {
        const optionsMovies = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                include_adult: 'false',
                include_video: 'false',
                language: 'en-US',
                page: '1',
                with_genres: genres && genres[0].id,
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTA2YWFmOWNkMjE1ZWMwMjZjYTY5OTBlMjE2NDQ4ZiIsInN1YiI6IjY2MDQ0NGQyMDQ3MzNmMDE0YWU4NWYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BWiPQiJfB-kVLufmhb-dwWewyLYfisJfxBAzmxV89GA'
            }
        };


        async function fetchMoviesData() {
            const { data } = await axios.request(
                optionsMovies
            );
            console.log(data)
            const dataMovies: Movie[] = [];
            data.results.map((movie: any) => {
                const newMovie: Movie = {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    genres: movie.genre_ids,
                    releaseDate: movie.release_date,
                    posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                    backgroundPath: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                }
                return dataMovies.push(newMovie);
            })
            setSimilarMovies(dataMovies);
        }

        fetchMoviesData();


    }, [genres])

    return (
        <>
            <div className='flex flex-col mt-8'>
                <div className='similar_movies_slider-text mb-3 w-5/6 self-center'>People also watched</div>
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
                {similarMovies?.filter((movie) => {
                    return movie.id !== id;
                }).map((movie) => {
                    return <SwiperSlide key={movie.id}>
                        <Link to={`/movie/${movie.id}`} className='similar_movie_slide rounded relative'>
                            <img className="rounded" src={movie.backgroundPath} alt='similar movie' />
                            <div className='similar_movie-title w-36 absolute bottom-2 left-2'>{movie.title}</div>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}

export default SimilarMoviesSlider