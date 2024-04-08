import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Genre from "../types/genre";
import axios from "axios";

const GenresShowsContext = createContext<Array<Genre> | undefined>(undefined);

interface GenresShowsContextProviderProps {
    children: ReactNode;
}

export function GenresShowsContextProvider({ children }: GenresShowsContextProviderProps) {
    const [genres, setGenres] = useState<Array<Genre>>([]);


    useEffect(() => {
        //fetching all TV shows genres
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/tv/list',
            params: { language: 'en' },
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
            const dataGenres: Genre[] = [];
            data.genres.map((genre: any) => {
                const newGenre: Genre = {
                    id: genre.id,
                    name: genre.name,
                }
                dataGenres.push(newGenre);
            })
            setGenres(dataGenres);
        }
        fetchData();
    }, []);

    return (
        <GenresShowsContext.Provider value={genres}> {children} </GenresShowsContext.Provider>
    )
}

export function useShowsGenres() {
    const genres = useContext(GenresShowsContext);
    console.log(genres)
    if (genres === undefined) {
        throw new Error("GenresShows must be used within a GenresShowsProvider");
    }
    return genres;
}
