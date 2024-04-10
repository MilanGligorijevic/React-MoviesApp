import React, { useEffect, useState } from "react";
import './css/style.scss';
import { useParams } from "react-router";
import Actor from "../../../types/actor";
import axios from "axios";
import ActorPreview from "../ActorPreview";

function CastPreviewShow(){
    const {showId} = useParams();
    const [showCast, setShowCast] = useState<Actor[]>();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${showId}/credits`,
            params: {language: 'en-US'},
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
            setShowCast(dataActors.slice(0, 10));
            //prikaz prvih 10 glumaca, zbog prakticnosti prikaza nisu ukljkuceni svi
        }
        fetchData();
    }, [showId])

    return (
        <div>
            <h1>Top cast</h1>
            <div className="flex gap-3">
            {showCast?.map((actor) => {
                return <ActorPreview {...actor}/>
            })}
            </div>
        </div>
    )
}

export default CastPreviewShow;