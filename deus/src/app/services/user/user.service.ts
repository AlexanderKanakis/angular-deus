import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host  = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  getData(): Observable<Profile> {
    const url=`${this.host}/rent-store/profile`
    const accessToken = localStorage.getItem('access_token') || '';
    const params = new HttpParams()
      .append('token', accessToken)
      .append('host', 'http://3.235.214.44:8000');
      const options = {
      params
    }
    return this.http.get<Profile>(url, options);
  }
}
