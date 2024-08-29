import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MovieService } from '../../services/movies/movies.service';
import { Movie } from '../../models/Movie';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {
  labels: number[] = [];
  values: {x:number, y:number, r:number}[] = [];
  colors: string[] = [];

  constructor(private movieService: MovieService) {

  }

  ngOnInit(): void {
    this.movieService.getMovies(1, 999).subscribe(data => {
      const movies = this.cleanData(data.results)
      const chartMap = movies.reduce((prev: {[key: string]: number}, cur: Movie) => {
        prev[cur.pub_date] = (prev[cur.pub_date] || 0) + 1;
        return prev;
      }, {});
      for (const year in chartMap) {
        this.labels.push(Number(year));
        const value = {
          x: Number(year),
          y: chartMap[year],
          r: chartMap[year] * 5
        }
        this.values.push(value);
        this.colors.push(this.randomColor())
      }
      this.renderChart()
    })
  }

  cleanData(movies: Movie[]): Movie[] {
    return movies.filter((movie) => movie.pub_date >= 1920 && movie.pub_date <= 2024 && movie.pub_date !== null)
  }

  randomColor(): string {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
  }

  renderChart() {
    const chart = new Chart('bubblechart', {
      type: 'bubble',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Published Movies per Year',
            data: this.values,
            backgroundColor: this.colors
          }
        ]
      }
    })
  }
}
