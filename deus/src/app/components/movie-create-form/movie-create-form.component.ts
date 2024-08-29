import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../../services/movies/movies.service';
import { MovieCategory } from '../../models/MovieCategory';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-create-form',
  templateUrl: './movie-create-form.component.html',
  styleUrl: './movie-create-form.component.scss'
})
export class MovieCreateFormComponent {
  categories: MovieCategory[] = []

  constructor(private formBuilder: FormBuilder, private movieService: MovieService) {
    this.movieService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }

  movieForm = this.formBuilder.group({
    title: ['', Validators.required],
    pub_date: ['', Validators.compose([Validators.min(1920), Validators.max(new Date().getFullYear())])],
    duration: ['', Validators.pattern("^[0-9]*$")],
    rating: '',
    description: '',
    categories: ['',  Validators.required]
  })

  onCatClick(e: any) {
    const newCat = e.target.value;
    let categories = this.movieForm.value.categories || '';
    if(!categories.includes(newCat)){
      this.movieForm.controls.categories.setValue(`${categories}${e.target.value} `)
    }
    else {
      this.movieForm.controls.categories.setValue(`${categories.replace(`${e.target.value} `, '')}`)
    }
  }

  onSubmit() {
    const formData = this.movieForm.value
    const movie: Partial<Movie> = {
      title: formData.title || '',
      pub_date: Number(formData.pub_date) || 0,
      duration: Number(formData.duration) || 0,
      rating: Number(formData.rating) || 0,
      description: formData.description || '',
      categories: this.getCategoriesArray(formData.categories || '')
    }
    this.movieService.createMovie(movie).subscribe(data => {
      console.log(data)
    })
  }

  getCategoriesArray(categories: string): string[] {
      let array = categories.split(' ');
      array.pop();
      return array;
  }
}