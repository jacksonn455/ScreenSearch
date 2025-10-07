export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface OmdbApiResponse {
  Search?: Movie[];
  Error?: string;
  Response: string;
}

export interface HttpError {
  status: number;
  message: string;
  code?: string;
}