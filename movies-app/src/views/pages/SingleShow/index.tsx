import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Show from '../../../types/show';
import Footer from '../../components/footer';
import { Rating, useMediaQuery } from '@mui/material';
import SimilarShowsSlider from '../../components/SimilarShowsSlider';
import CastPreviewShow from '../../components/CastPreviewShow';
import { useCurrentUser } from '../../../context/usersContext';
import { useWatchlist } from '../../../context/watchlistContext';
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes';
import NavbarMobile from '../../components/NavbarMobile';

function SingleMovie() {
    const { showId } = useParams();
    const [showDetails, setShowDetails] = useState<Show>();
    const [rating, setRating] = useState<number | undefined>(0);
    const currentUser = useCurrentUser();
    const navigateToLogInPage = useNavigate();
    const watchlist = useWatchlist();

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );


    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${showId}`,
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
            const newShow: Show = {
                id: data.id,
                title: data.name,
                overview: data.overview,
                genres: data.genres,
                releaseDate: data.first_air_date,
                posterPath: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
                backgroundPath: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
                rating: Math.round(data.vote_average * 10) / 20,
                mediaType: 'show'
            }
            setShowDetails(newShow);
            setRating(newShow.rating);
        }
        fetchData();
    }, [showId])

    return (
        <div className='single_show_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='single_show_info relative sm:overflow-auto'>
                <img className="single_show_background " src={showDetails?.backgroundPath} alt="show cover" />
                <div className='absolute top-10 left-28 flex gap-10 sm:top-7 sm:left-10 sm:gap-5'>
                    <div className='w-52 rounded sm:w-44'>
                        <img className="rounded" src={showDetails?.posterPath} alt="show preview" />
                    </div>
                    <div className='single_show_details w-9/12'>
                        <div className='single_show_details-title text-3xl font-semibold sm:text-2xl'>{showDetails?.title}</div>
                        <Rating
                            name="read-only"
                            precision={0.5}
                            value={rating}
                            readOnly
                        />
                        <div className='single_show_details-genres flex gap-3 mb-5 text-base sm:text-sm sm:flex-col sm:gap-0.5 s:text-sm s:flex-col s:gap-0.5'>
                            {showDetails?.genres.map((genre) => {
                                return <div key={genre.id}>{genre.name}</div>
                            })}
                        </div>
                        {!isSmallMobile && <div className='single_show_details-text w-9/12 text-base s:text-sm'>{showDetails?.overview}</div>}
                    </div>
                </div>
                <div className='absolute top-12 right-28 sm:top-64 sm:right-36 s:bottom-10 s:top-auto s:right-auto s:left-28'>
                    {watchlist.watchlist.some((item) => item?.id === showDetails?.id) ?
                        <div className='single_show_button-add-to-watch-list font-semibold rounded p-2.5 sm:p-2 sm:text-sm s:p-2 s:text-sm'>&#10003; ON YOUR WATCHLIST</div>
                        :
                        <button className='single_show_button-add-to-watch-list font-semibold rounded p-2.5 sm:p-2 sm:text-sm s:p-2 s:text-sm' onClick={() => currentUser.user !== null && showDetails ? watchlist.addToWatchlistAndFirebase(showDetails) : navigateToLogInPage('/login')}>+ ADD TO WATCHLIST</button>
                    }
                </div>
            </div>
            {isSmallMobile && <div>
                <h1 className='mt-5 mb-3 font-medium text-2xl ml-7'>Overview</h1>
                <div className='ml-7 mr-3'>{showDetails?.overview}</div>
            </div>}
            <CastPreviewShow />
            <SimilarShowsSlider {...showDetails} />
            <Footer />
        </div>
    )
}

export default SingleMovie