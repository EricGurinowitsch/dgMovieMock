import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service'
import { SearchResults } from '../searchresults';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  searchResults: SearchResults;
  finalMovieList: Movie[] = [];
  filteredMovieList: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
    this.filteredMovieList = this.finalMovieList;
  }

  getMovies(): void {
    this.movieService.getMovies()
    .subscribe(searchResults => {
      this.searchResults = searchResults;
      searchResults.Search.map(movie => {
        this.movieService.getMovieDetails(movie.imdbID)
        .subscribe(movieWithDetails => this.finalMovieList.push(movieWithDetails));
      })
    });
  }

  filterYear($event: any) {
    switch ($event.target.id) {
      case "allMovies":
        this.filteredMovieList = this.finalMovieList;
      break;
      case "2000": 
        this.filteredMovieList = this.finalMovieList.filter(
          filteredMovie => Number(filteredMovie.Year) < 3000
          && Number(filteredMovie.Year) >= 2000);
      break;
      case "1990": 
        this.filteredMovieList = this.finalMovieList.filter(
          filteredMovie => Number(filteredMovie.Year) < 2000
          && Number(filteredMovie.Year) >= 1990);
      break;
      default: this.finalMovieList;
    }
  }

  toggleFilterBtnSelected($event: any){
    let filterBtnSelected = $event.target || $event.srcElement;

    if( filterBtnSelected.nodeName === "BUTTON" ) {
      let isfilterBtnActive = filterBtnSelected.parentElement.querySelector(".filter-btn-selected");
      if( isfilterBtnActive ) {
        isfilterBtnActive.classList.remove("filter-btn-selected");
      }
      filterBtnSelected.className += " filter-btn-selected";
    }

  }

}
