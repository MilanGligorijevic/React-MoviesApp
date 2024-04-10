import React from "react";
import './css/style.scss';

interface ActorPreviewProps {
    id: number,
    name: string,
    character: string,
    profileImage: string,
}

function ActorPreview({id, name, character, profileImage}: ActorPreviewProps){
    return(
        <div className="rounded w-36">
            <img className="h-48 rounded" src={profileImage} alt="actor preview"/>
            <div className="w-32 text-wrap">
                <h2 className="actor_name">{name}</h2>
                <h2 className="actor_character">{character}</h2>
            </div>
        </div>
    )
}

export default ActorPreview;