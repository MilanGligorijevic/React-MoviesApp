import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Movie from '../../../types/movie';
import Footer from '../../components/footer';
import Rating from '@mui/material/Rating';
import SimilarMoviesSlider from '../../components/SimilarMoviesSlider';
import CastPreviewMovie from '../../components/CastPreviewMovie';
import { useCurrentUser } from '../../../context/usersContext';
import { useWatchlist } from '../../../context/watchlistContext';

function SingleMovie() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState<Movie>();
    const [rating, setRating] = useState<number | undefined>(0);
    const currentUser = useCurrentUser();
    const watchlist = useWatchlist();
    const navigateToLogInPage = useNavigate();
    

    function handleRatingChange(e: any) {
        setRating(e.target.value);
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTA2YWFmOWNkMjE1ZWMwMjZjYTY5OTBlMjE2NDQ4ZiIsInN1YiI6IjY2MDQ0NGQyMDQ3MzNmMDE0YWU4NWYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BWiPQiJfB-kVLufmhb-dwWewyLYfisJfxBAzmxV89GA'
            }
        };

        async function fetchData() {
            const { data } = await axios.request(
                options
            );
            console.log(data)
            const newMovie: Movie = {
                id: data.id,
                title: data.original_title,
                overview: data.overview,
                genres: data.genres,
                releaseDate: data.release_date,
                posterPath: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
                backgroundPath: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
                rating: Math.round(data.vote_average * 10) / 20,
                mediaType: 'movie'
                //hardcodovan mediaType jer znamo da smo na SingleMovie stranici
            }
            setMovieDetails(newMovie);
            setRating(newMovie.rating)
        }
        fetchData();
    }, [movieId])

    return (
        <div className='single_movie_main'>
            <Navbar />
            <div className='single_movie_info relative'>
                <img className="single_movie_background " src={movieDetails?.backgroundPath} alt="movie cover" />
                <div className='absolute top-10 left-28 flex gap-10'>
                    <div className='w-52 rounded'>
                        <img className="rounded" src={movieDetails?.posterPath} alt="movie preview" />
                    </div>
                    <div className='single_movie_details w-9/12'>
                        <div className='single_movie_details-title'>{movieDetails?.title}</div>
                        <Rating
                            name="simple-controlled"
                            precision={0.5}
                            value={rating}
                            onChange={(e) => handleRatingChange(e)}
                        />
                        <div className='single_movie_details-genres flex gap-3 mb-5'>
                            {movieDetails?.genres.map((genre) => {
                                return <div key={genre.id}>{genre.name}</div>
                            })}
                        </div>
                        <div className='single_movie_details-text w-9/12'>{movieDetails?.overview}</div>
                    </div>
                </div>
                <div className='absolute top-12 right-28'>
                    <button className='single_movie_button-add-to-watch-list rounded p-2.5' onClick={() => currentUser.user !== null && movieDetails ? watchlist.addToWatchlistAndFirebase(movieDetails) : navigateToLogInPage('/login')}>+ ADD TO WATCHLIST</button>
                </div>
            </div>
            <CastPreviewMovie />
            <SimilarMoviesSlider {...movieDetails} />
            <Footer />
        </div>
    )
}

export default SingleMovie