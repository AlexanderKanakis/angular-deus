import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomTokenObjectPair } from '../../../models/CustomtokenObjectPair';
import { environment } from '../../../../environments/environment.development';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host  = environment.proxyHost;
  private apiUrl = environment.apiUrl;
  private refreshTokenEndpoint = 'auth/refresh/';
  private loginEndpoint = 'auth/login/';

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  async login(credentials: CustomTokenObjectPair): Promise<void> {
    const data = {
      host: this.apiUrl,
      credentials
    }
    this.http.post<any>(`${this.host}/${this.loginEndpoint}`, data).subscribe(data => {
      if(data.access){
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
  
        this.userService.getData().subscribe(userService => {
          if (userService) {
            localStorage.setItem('name', userService.first_name);
          }
          if (userService.email === environment.admin) {
            localStorage.setItem('isAdmin', 'true');
          }
          else {
            localStorage.setItem('isAdmin', 'false');
          }

          this.router.navigate(['/']);
        })
      }
    })
  }

  refreshAccessToken(): Observable<any> {
    const data = {
      refreshToken: {
        refresh: localStorage.getItem('refresh_token')
      },
      host: this.apiUrl
    }
    return this.http.post<any>(`${this.host}/${this.refreshTokenEndpoint}`, data).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access);
      }),
      catchError((error) => {
        console.error('Error refreshing access token:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}