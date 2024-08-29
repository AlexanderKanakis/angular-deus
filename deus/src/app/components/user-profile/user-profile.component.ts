import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movies/movies.service';
import { MovieRentals } from '../../models/MovieRentals';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    wallet: 0 
  };
  rentedMovies: MovieRentals[] = [];
  historyMovies: MovieRentals[] = [];
  moviesDisplay: MovieRentals[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  nextPage: number | null = 1;
  totalItems: number = 0;
  currentPaginationIndex: number = this.currentPage-1;
  showsCurrent: boolean = true;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private movieService: MovieService, private authService: AuthService) {
    this.getUser();
    this.getCurrentRented();
    const isAdminString: string = localStorage.getItem('isAdmin') || 'false';
    this.isAdmin = JSON.parse(isAdminString);
  }

  getUser() {
    this.userService.getData().subscribe(data => {
      this.user = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        wallet: data.wallet
      }
    })
  }

  getCurrentRented() {
    this.movieService.getRentals(this.currentPage, this.pageSize, true).subscribe(data => {
      this.nextPage = data.next ? Number(data.next.split('page=')[1].charAt(0)) : null
      this.totalItems = data.count? data.count : 0;
      this.rentedMovies = data.results;
      this.moviesDisplay = this.rentedMovies;
      this.showsCurrent = true
    })
  }

  getRentedHistory() {
    this.movieService.getRentals(this.currentPage, this.pageSize, false).subscribe(data => {
      this.nextPage = data.next ? Number(data.next.split('page=')[1].charAt(0)) : null
      this.totalItems = data.count? data.count : 0;
      this.historyMovies = data.results;
      this.moviesDisplay = this.historyMovies;
      console.log(this.historyMovies)
      this.showsCurrent = false;
    })
  }

  onActiveClick() {
    this.currentPage = 1;
    this.nextPage = 1;
    this.totalItems = 0;
    this.currentPaginationIndex = this.currentPage-1
    this.getCurrentRented();
  }

  onHistoryClick() {
    this.currentPage = 1;
    this.nextPage = 1;
    this.totalItems = 0;
    this.currentPaginationIndex = this.currentPage-1
    this.getRentedHistory();
  }

  onNameEvent(e: any) {
    const movies = this.showsCurrent ? this.rentedMovies : this.historyMovies;
    if(e !== '') {
      this.moviesDisplay = movies.filter((movie) => movie.movie === e);
    }
    else {
      this.moviesDisplay = movies;
    }
  }

  pageChanged(e: PageEvent) {
    this.currentPaginationIndex = e.pageIndex;
    this.currentPage = this.currentPaginationIndex + 1;
    const getCurrent = this.showsCurrent
    this.movieService.getRentals(this.currentPage, this.pageSize, getCurrent).subscribe(data => {
      this.nextPage = data.next ? Number(data.next.split('page=')[1].charAt(0)) : null
      this.totalItems = data.count? data.count : 0;
      if(this.showsCurrent) {
        this.rentedMovies = data.results;
        this.moviesDisplay = this.rentedMovies;
      }
      else{
        this.historyMovies = data.results;
        this.moviesDisplay = this.historyMovies;
      }
    })
  }

  onReturnClick(movie: MovieRentals) {
    this.movieService.returnMovie(movie.uuid).subscribe(data => {
      this.getCurrentRented();
      this.getUser();
    })
  }

  onSortClick(e: any) {
    const movies = this.showsCurrent ? [ ...this.rentedMovies ] : [ ...this.historyMovies ]
    if (e.target.checked) {
      movies.sort((a, b) => {
        return a.rental_date.localeCompare(b.rental_date)
      })
    }
    this.moviesDisplay = movies

  }

  onLogoutClick() {
    this.authService.logout()
  }
}
