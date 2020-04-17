import { Movie } from './movie';

export interface SearchResults {
    Search: Movie[];
    totalResults: string;
    Response: string;
  }
