import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Show from "../types/show";
import axios from "axios";

const ShowsContext = createContext<Array<Show> | undefined>(undefined);

interface ShowsContextProviderProps {
    children: ReactNode;
}

export function ShowsContextProvider({ children }: ShowsContextProviderProps) {
    const [popularShows, setPopularShows] = useState<Array<Show>>([]);


    useEffect(() => {
        //fetching popular tv shows this week
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/tv/week',
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
            const dataShows: Show[] = [];
            data.results.map((show: any) => {
                const newShow: Show = {
                    id: show.id,
                    title: show.name,
                    overview: show.overview,
                    genres: show.genre_ids,
                    releaseDate: show.first_air_date,
                    posterPath: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
                    backgroundPath: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`
                }
                return dataShows.push(newShow);
            })
            setPopularShows(dataShows);
        }
        fetchData();
    }, []);

    return (

        <ShowsContext.Provider value={popularShows}> {children} </ShowsContext.Provider>
    )
}

export function usePopularShows() {
    const popularShows = useContext(ShowsContext);
    if (popularShows === undefined) {
        throw new Error("Shows must be used within a ShowsProvider");
    }
    return popularShows;
}
