import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useParams } from 'react-router'
import axios from 'axios';
import Movie from '../../../types/movie';
import MoviePreview from '../../components/MoviePreview';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, tabletMobileScreen } from '../../../utilities/screenSizes';
import NavbarMobile from '../../components/NavbarMobile';
import LoadingCircle from '../../components/LoadingCircle';

function GenresMovies() {
    const { genreId, genreName } = useParams();
    const [moviesByGenre, setMoviesByGenre] = useState<Array<Movie>>([]);
    const currentPage: number = 1;
    const [isLoading, setIsLoading] = useState(true);


    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${tabletMobileScreen}px)`,
    );


    useEffect(() => {


        const optionsMovies = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                include_adult: 'false',
                include_video: 'false',
                language: 'en-US',
                page: currentPage.toString(),
                with_genres: genreId,
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
            const dataMovies: Movie[] = [];
            data.results.map((movie: any) => {
                const newMovie: Movie = {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    genres: movie.genre_ids,
                    releaseDate: movie.release_date,
                    posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                }
                return dataMovies.push(newMovie);
            })
            setMoviesByGenre(dataMovies);
            setIsLoading(false);
        }

        fetchMoviesData();



    }, [genreId])

    return (
        <div className='main_genres'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }

            <div className='genre_container flex-col ml-20 mt-10 mb-10 sm:mx-5 sm:mt-5 s:mx-5'>
                <div className='genre_title sm:text-2xl'>Movies by Genre / <span className='font-semibold'>{genreName}</span></div>
                {isLoading ? <LoadingCircle /> : <div className='flex flex-wrap gap-3 mt-5 sm:gap-4'>
                    {moviesByGenre.map((movie: Movie) => {
                        return <MoviePreview key={movie.id} {...movie} />
                    })}
                </div>}

            </div>

            <Footer />

        </div>


    )
}

export default GenresMovies;