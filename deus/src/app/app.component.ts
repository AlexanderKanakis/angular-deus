import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from './services/movies/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'deus';
}
