import { Component, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../services/movies/movies.service';
import { MovieCategory } from '../../models/MovieCategory';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  categories: MovieCategory[] = [];
  catHidden: boolean = true;
  selectedCategory: string = ''

  @Output() yearEvent = new EventEmitter<number>();
  @Output() categoryEvent = new EventEmitter<string>();

  constructor(private categoryData:MovieService) {
    this.categoryData.getCategories().subscribe(data => {
      this.categories = data
    })
  }

  onCategoryClick() {
    this.catHidden = !this.catHidden;
  }

  onYearSubmit(e: any) {
    const year = Number(e.target.elements[0].value) || 0
    this.yearEvent.emit(year)
  }

  onCategoryNameClick(e: any) {
    const category = e.target.innerText;
    if (this.selectedCategory !== category) {
      this.categoryEvent.emit(category);
      this.selectedCategory = category
    }
    else {
      this.categoryEvent.emit('');
    }
  }

}
