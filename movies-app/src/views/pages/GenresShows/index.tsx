import React, { useEffect, useState } from 'react'
import './css/style.scss'
import { useParams } from 'react-router'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Show from '../../../types/show';
import ShowPreview from '../../components/ShowPreview';
import Footer from '../../components/footer';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, tabletMobileScreen } from '../../../utilities/screenSizes';
import NavbarMobile from '../../components/NavbarMobile';
import LoadingCircle from '../../components/LoadingCircle';

function GenresShows() {
    const { genreId, genreName } = useParams();
    const [showsByGenre, setShowsByGenre] = useState<Array<Show>>([]);
    const [isLoading, setIsLoading] = useState(true);


    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${tabletMobileScreen}px)`,
    );

    useEffect(() => {
        const optionsShows = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv',
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
                    genres: show.genre_ids,
                    releaseDate: show.first_air_date,
                    posterPath: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
                }
                return dataShows.push(newShow);
            })
            setShowsByGenre(dataShows);
            setIsLoading(false);
        }
        fetchShowsData();

    }, [genreId])

    return (
        <div className='main_genres_shows'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='genre_container flex-col ml-20 mt-10 mb-10 sm:mx-5 sm:mt-5 s:mx-5'>
                <div className='genre_title sm:text-2xl'>Shows by Genre / <span className='font-semibold'>{genreName}</span></div>
                {isLoading ? <LoadingCircle /> : <div className='flex flex-wrap gap-3 mt-5 sm:gap-4'>
                    {showsByGenre.map((show: Show) => {
                        return <ShowPreview key={show.id} {...show} />
                    })}
                </div>}
            </div>
            <Footer />

        </div>


    )
}

export default GenresShows