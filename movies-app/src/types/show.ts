import Genre from "./genre";

type Show = {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  releaseDate: string;
  posterPath: string;
  backgroundPath?: string;
  rating?: number;
};

export default Show;
