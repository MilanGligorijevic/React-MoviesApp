import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Show from '../../../types/show';
import Footer from '../../components/footer';
import { Rating } from '@mui/material';
import SimilarShowsSlider from '../../components/SimilarShowsSlider';
import CastPreviewShow from '../../components/CastPreviewShow';
import { useCurrentUser } from '../../../context/usersContext';
import { useWatchlist } from '../../../context/watchlistContext';

function SingleMovie() {
    const { showId } = useParams();
    const [showDetails, setShowDetails] = useState<Show>();
    const [rating, setRating] = useState<number | undefined>(0);
    const currentUser = useCurrentUser();
    const navigateToLogInPage = useNavigate();
    const watchlist = useWatchlist();


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
            <Navbar />
            <div className='single_show_info relative'>
                <img className="single_show_background " src={showDetails?.backgroundPath} alt="show cover" />
                <div className='absolute top-10 left-28 flex gap-10'>
                    <div className='w-52 rounded'>
                        <img className="rounded" src={showDetails?.posterPath} alt="show preview" />
                    </div>
                    <div className='single_show_details w-9/12'>
                        <div className='single_show_details-title'>{showDetails?.title}</div>
                        <Rating
                            name="read-only"
                            precision={0.5}
                            value={rating}
                            readOnly
                        />
                        <div className='single_show_details-genres flex gap-3 mb-5'>
                            {showDetails?.genres.map((genre) => {
                                return <div key={genre.id}>{genre.name}</div>
                            })}
                        </div>
                        <div className='single_show_details-text w-9/12'>{showDetails?.overview}</div>
                    </div>
                </div>
                <div className='absolute top-12 right-28'>
                    {watchlist.watchlist.some((item) => item?.id === showDetails?.id) ?
                        <div className='single_show_button-add-to-watch-list rounded p-2.5'>&#10003; ON YOUR WATCHLIST</div>
                        :
                        <button className='single_show_button-add-to-watch-list rounded p-2.5' onClick={() => currentUser.user !== null && showDetails ? watchlist.addToWatchlistAndFirebase(showDetails) : navigateToLogInPage('/login')}>+ ADD TO WATCHLIST</button>
                    }
                </div>
            </div>
            <CastPreviewShow />
            <SimilarShowsSlider {...showDetails} />
            <Footer />
        </div>
    )
}

export default SingleMovie