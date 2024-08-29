import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { MovieResults } from '../../models/MovieResponse';
import { MovieCategory } from '../../models/MovieCategory';
import { MovieRentalResults } from '../../models/MovieRentalResponse';
import { Movie } from '../../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private host  = environment.proxyHost;
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getMovies(page: number = 1, pageSize: number = 8): Observable<MovieResults> {
    const url=`${this.host}/rent-store/movies?page=${page}&page_size=${pageSize}`
    const accessToken = localStorage.getItem('access_token') || '';
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', this.apiUrl);
      const options = {
      params
    }
    return this.http.get<MovieResults>(url, options);
  }

  getRentals(page: number = 1, pageSize: number = 8, onlyActive: boolean): Observable<MovieRentalResults> {
    const getCurrentRented = onlyActive ? `&only-active`: ``;
    const url=`${this.host}/rent-store/rentals?page=${page}&page_size=${pageSize}${getCurrentRented}`
    const accessToken = localStorage.getItem('access_token') || '';
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', this.apiUrl);
      const options = {
      params
    }
    return this.http.get<MovieRentalResults>(url, options);
  }

  getCategories(): Observable<MovieCategory[]> {
    const url=`${this.host}/rent-store/categories`
    const accessToken = localStorage.getItem('access_token') || '';
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', this.apiUrl);
      const options = {
      params
    }
    return this.http.get<MovieCategory[]>(url, options);
  }

  rentMovie(uuid: string): Observable<any> {
    const url=`${this.host}/rent-store/rentals`
    const accessToken = localStorage.getItem('access_token') || '';
    const body = { movie: uuid }
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', this.apiUrl);
      const options = {
      params
    }
    return this.http.post<any>(url, body, options);
  }

  returnMovie(uuid: string): Observable<any> {
    const url=`${this.host}/rent-store/rentals`
    const accessToken = localStorage.getItem('access_token') || '';
    const body = { uuid };
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', this.apiUrl);
      const options = {
      params
    }
    return this.http.patch<any>(url, body, options);
  }

  createMovie(movie: Partial<Movie>): Observable<any> {
    const url=`${this.host}/rent-store/movies`
    const accessToken = localStorage.getItem('access_token') || '';
    const body = { ...movie };
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', this.apiUrl);
      const options = {
      params
    }
    return this.http.post<any>(url, body, options);
  }

}
