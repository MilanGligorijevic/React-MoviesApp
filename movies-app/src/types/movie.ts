import Genre from "./genre";

type Movie = {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  releaseDate: string;
  posterPath: string;
  backgroundPath?: string;
  rating?: number;
};

export default Movie;
