type SearchResult = {
  id: number;
  title: string;
  overview: string;
  genres: number[];
  releaseDate?: string;
  posterPath: string;
  backgroundPath?: string;
  rating?: number;
  mediaType?: string;
};

export default SearchResult;
