import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-cell',
  templateUrl: './movie-cell.component.html',
  styleUrl: './movie-cell.component.scss'
})
export class MovieCellComponent {

  constructor(private router: Router) { }

  @Input() movie: Movie = {
      uuid: '',
      title: '',
      pub_date: 0,
      duration: 0,
      rating: 0,
      description: '',
      poster_url: '',
      categories: []
  };

  ngOnInit(): void {
  }

  ngOnChange(): void {
  }

  onMovieClick() {
    this.router.navigate(['movie-display'], {state: { movie: this.movie }})
  }

}
