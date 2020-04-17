import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResults } from './searchresults';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'http://www.omdbapi.com/?apikey=299829c&s=Batman&type=movie';
  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<SearchResults>(this.moviesUrl);
  }

  getMovieDetails(movieId : string) {
    const detailsUrl = `http://www.omdbapi.com/?apikey=299829c&i=${movieId}`;
    return this.http.get<Movie>(detailsUrl);
  }
}
