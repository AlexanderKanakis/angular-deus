import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from '../../services/movies/movies.service';
import { Movie } from '../../models/Movie';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  movies: Movie[] = [];
  moviesDisplay: Movie[] = [];
  totalItems: number = 0;
  pageSize: number = Number(localStorage.getItem('pageSize')) || 8;
  currentPage: number = Number(localStorage.getItem('currentPage')) || 1;
  currentPaginationIndex: number = this.currentPage-1
  nextPage: number | null = 2;


  constructor(private movieService:MovieService) {
    this.movieService.getMovies(this.currentPage, this.pageSize).subscribe(data => {
      this.nextPage = data.next ? Number(data.next.split('page=')[1].charAt(0)) : null
      this.totalItems = data.count? data.count : 0;
      this.movies = data.results;
      this.moviesDisplay = this.movies
    })
  }

  pageChanged(e: PageEvent) {
    this.currentPaginationIndex = e.pageIndex;
    this.currentPage = this.currentPaginationIndex + 1;
    localStorage.setItem('currentPage', this.currentPage.toString())
    this.movieService.getMovies(this.currentPage, this.pageSize).subscribe(data => {
      this.nextPage = data.next ? Number(data.next.split('page=')[1].charAt(0)) : null
      this.totalItems = data.count? data.count : 0;
      this.movies = data.results
      this.moviesDisplay = this.movies
    })
  }

  onYearEvent(e: any) {
    if(e !== 0) {
      this.moviesDisplay = this.movies.filter((movie) => movie.pub_date === e);
    }
    else {
      this.moviesDisplay = this.movies;
    }
  }

  onCategoryEvent(e: any) {
    if(e !== '') {
      this.moviesDisplay = this.movies.filter((movie) => movie.categories.includes(e));
    }
    else {
      this.moviesDisplay = this.movies;
    }
  }

  onNameEvent(e: any) {
    if(e !== '') {
      this.moviesDisplay = this.movies.filter((movie) => movie.title === e);
    }
    else {
      this.moviesDisplay = this.movies;
    }
  }
}
