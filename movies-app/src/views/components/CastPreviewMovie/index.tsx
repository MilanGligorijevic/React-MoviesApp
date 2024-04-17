import React, { useEffect, useState } from "react";
import './css/style.scss';
import Actor from "../../../types/actor";
import { useParams } from "react-router";
import axios from "axios";
import ActorPreview from "../ActorPreview";

function CastPreviewMovie() {
    const { movieId } = useParams();
    const [movieCast, setMovieCast] = useState<Actor[]>();

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
        <div className="cast_preview_movie_main w-5/6 ml-40">
            <h1 className="cast_preview_movie_title mt-8 mb-3">Top cast</h1>
            <div className="flex gap-4">
                {movieCast?.map((actor) => {
                    return <ActorPreview key={actor.id} {...actor} />
                })}
            </div>
        </div>
    )
}

export default CastPreviewMovie;