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
import NavbarMobile from '../../components/NavbarMobile';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes';

function SingleMovie() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState<Movie>();
    const [rating, setRating] = useState<number | undefined>(0);
    const currentUser = useCurrentUser();
    const watchlist = useWatchlist();
    const navigateToLogInPage = useNavigate();

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );



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
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='single_movie_info relative sm:overflow-auto'>
                <img className="single_movie_background " src={movieDetails?.backgroundPath} alt="movie cover" />
                <div className='absolute top-10 left-28 flex gap-10 sm:top-7 sm:left-8 sm:gap-5'>
                    <div className='w-52 rounded sm:w-44'>
                        <img className="rounded" src={movieDetails?.posterPath} alt="movie preview" />
                    </div>
                    <div className='single_movie_details w-9/12'>
                        <div className='single_movie_details-title text-3xl font-semibold sm:text-2xl lg:w-56'>{movieDetails?.title}</div>
                        <Rating
                            name="read-only"
                            precision={0.5}
                            value={rating}
                            readOnly
                        />
                        <div className='single_movie_details-genres flex gap-3 mb-5 text-base sm:text-sm sm:flex-col sm:gap-0.5 s:text-sm s:flex-col s:gap-0.5'>
                            {movieDetails?.genres.map((genre) => {
                                return <div key={genre.id}>{genre.name}</div>
                            })}
                        </div>
                        {!isSmallMobile && <div className='single_movie_details-text overflow-hidden h-56 w-9/12 text-base s:text-sm s:h-48'>{movieDetails?.overview}</div>}
                    </div>

                </div>
                <div className='absolute top-12 right-28 sm:top-64 sm:right-36 s:bottom-10 s:top-auto s:right-auto s:left-28 '>
                    {watchlist.watchlist?.some((item) => item?.id === movieDetails?.id) ?
                        <div className='single_movie_button-add-to-watch-list font-semibold rounded shadow p-2.5 sm:p-2 sm:text-sm s:p-2 s:text-sm'>&#10003; ON YOUR WATCHLIST</div>
                        :
                        <button className='single_movie_button-add-to-watch-list font-semibold rounded shadow p-2.5 sm:p-2 sm:text-sm s:p-2 s:text-sm' onClick={() => currentUser.user !== null && movieDetails ? watchlist.addToWatchlistAndFirebase(movieDetails) : navigateToLogInPage('/login')}>+ ADD TO WATCHLIST</button>
                    }

                </div>
            </div>
            {isSmallMobile && <div>
                <h1 className='mt-5 mb-3 font-medium text-2xl ml-7'>Overview</h1>
                <div className='ml-7 mr-3'>{movieDetails?.overview}</div>
            </div>}
            <CastPreviewMovie />
            <SimilarMoviesSlider {...movieDetails} />
            <Footer />
        </div>
    )
}

export default SingleMovie