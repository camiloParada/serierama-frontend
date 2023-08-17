import { Movie } from "./movie.interface";

export interface MovieResponse {
  page: number;
  results: Movie[];
}
