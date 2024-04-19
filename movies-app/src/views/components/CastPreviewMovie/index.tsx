import React, { useEffect, useState } from "react";
import './css/style.scss';
import Actor from "../../../types/actor";
import { useParams } from "react-router";
import axios from "axios";
import ActorPreview from "../ActorPreview";
import { useMediaQuery } from "@mui/material";
import { smallMobileScreen, smallerDesktopScreen, tabletScreen, smallerTabletScreen } from "../../../utilities/screenSizes";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";

function CastPreviewMovie() {
    const { movieId } = useParams();
    const [movieCast, setMovieCast] = useState<Actor[]>();

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
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
            const dataActors: Actor[] = [];
            data.cast.map((actor: any) => {
                const newActor: Actor = {
                    id: actor.id,
                    name: actor.name,
                    character: actor.character,
                    profileImage: `https://image.tmdb.org/t/p/original/${actor.profile_path}`,
                }
                return dataActors.push(newActor);
            })
            setMovieCast(dataActors.slice(0, 10));
            //prikaz prvih 10 glumaca, zbog prakticnosti prikaza nisu ukljkuceni svi
        }
        fetchData();
    }, [movieId])

    return (
        <div>
            {isSmallMobile ?
                <>
                    <h1 className="cast_preview_movie_title mt-5 mb-3 sm:text-2xl ml-7">Top cast</h1>
                    <Swiper
                        className='w-5/6 mb-7'
                        spaceBetween={10}
                        slidesPerView={2}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {movieCast?.map((actor) => {
                            return <SwiperSlide key={actor.id}>
                                <ActorPreview {...actor} />
                            </SwiperSlide>
                        })}
                    </Swiper>
                </>
                :
                isSmallerDesktop ?
                    <>
                        <h1 className="cast_preview_movie_title mt-5 mb-3 sm:text-2xl ml-28">Top cast</h1>
                        <Swiper
                            className='w-5/6 mb-7'
                            spaceBetween={10}
                            slidesPerView={isSmallerTablet ? 4 : isTablet ? 5 : 6}
                            navigation={true}
                            modules={[Navigation]}
                        >
                            {movieCast?.map((actor) => {
                                return <SwiperSlide key={actor.id}>
                                    <ActorPreview {...actor} />
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </>
                    :
                    < div className="cast_preview_movie_main w-5/6 ml-40">
                        <h1 className="cast_preview_movie_title mt-8 mb-3">Top cast</h1>
                        <div className="flex gap-4">
                            {movieCast?.map((actor) => {
                                return <ActorPreview key={actor.id} {...actor} />
                            })}
                        </div>
                    </div>
            }

        </div >
    )
}

export default CastPreviewMovie;