import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../models/Movie';
import { MovieService } from '../../../services/movies/movies.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrl: './movie-display.component.scss'
})
export class MovieDisplayComponent {
  movie: Movie = {
    uuid: '',
    title: '',
    pub_date: 0,
    duration: 0,
    rating: 0,
    description: '',
    poster_url: '',
    categories: []
};

  constructor(private router: Router, private movieService: MovieService) {
    const context = this.router.getCurrentNavigation()?.extras.state?.['movie'];
    this.movie = context ? context : this.movie
  }

  onImageError(e: any) {
    e.target.src='/image.png'
  }

  onRentClick() {
    this.movieService.rentMovie(this.movie.uuid).subscribe(data => {
      console.log(data)
    })
  }

}
