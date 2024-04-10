import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useParams } from 'react-router'
import axios from 'axios';
import Movie from '../../../types/movie';
import MoviePreview from '../../components/MoviePreview';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

function GenresMovies() {
    const { genreId, genreName } = useParams();
    const [moviesByGenre, setMoviesByGenre] = useState<Array<Movie>>([]);
    const numberOfPagesToLoad = 3;

    useEffect(() => {


        const optionsMovies = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                include_adult: 'false',
                include_video: 'false',
                language: 'en-US',
                page: '1',
                with_genres: genreId,
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTA2YWFmOWNkMjE1ZWMwMjZjYTY5OTBlMjE2NDQ4ZiIsInN1YiI6IjY2MDQ0NGQyMDQ3MzNmMDE0YWU4NWYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BWiPQiJfB-kVLufmhb-dwWewyLYfisJfxBAzmxV89GA'
            }
        };


        async function fetchMoviesData() {
            console.log(optionsMovies.params.page)
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
                }
                return dataMovies.push(newMovie);
            })
            setMoviesByGenre(dataMovies);
        }

        fetchMoviesData();


    }, [genreId])

    return (
        <div className='main_genres'>
            <Navbar />
            <div className='genre_container flex-col ml-20 mt-10'>
                <div className='genre_title'>Movies by Genre / <span className='font-semibold'>{genreName}</span></div>
                <div className='flex flex-wrap gap-3 mt-5'>
                    {moviesByGenre.map((movie: Movie) => {
                        return <MoviePreview key={movie.id} {...movie} />
                    })}
                </div>

            </div>
            <Footer />

        </div>


    )
}

export default GenresMovies;