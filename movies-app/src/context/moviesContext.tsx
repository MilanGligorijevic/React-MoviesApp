import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from "react";
import Movie from "../types/movie";
import axios from "axios";

const MoviesContext = createContext<Array<Movie> | undefined>(undefined);

interface MoviesContextProviderProps {
  children: ReactNode;
}

export function MoviesContextProvider({ children }: MoviesContextProviderProps) {
  const [popularMovies, setPopularMovies] = useState<Array<Movie>>([]);


  useEffect(() => {
    //fetching popular movies this week
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/week',
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
      const dataMovies: Movie[] = [];
      data.results.map((movie: any) => {
        const newMovie: Movie = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          genres: movie.genre_ids,
          releaseDate: movie.release_date,
          posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          backgroundPath: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        }
        return dataMovies.push(newMovie);
      })
      setPopularMovies(dataMovies);
    }
    fetchData();
  }, []);

  return (

    <MoviesContext.Provider value={popularMovies}> {children} </MoviesContext.Provider>
  )
}

export function usePopularMovies() {
  const popularMovies = useContext(MoviesContext);
  if (popularMovies === undefined) {
    throw new Error("Movies must be used within a MoviesProvider");
  }
  return popularMovies;
}
