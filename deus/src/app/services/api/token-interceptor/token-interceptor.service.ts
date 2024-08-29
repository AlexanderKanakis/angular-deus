// token-interceptor.service.ts

import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


  export const  tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const accessToken = localStorage.getItem('access_token');
    const authService = inject(AuthService)


    if (accessToken) {
      request = addToken(request, accessToken);
    }

    return next(request).pipe(
      catchError((error) => {
        if (error.status === 401 && accessToken) {
          console.log('in')
          return handleTokenExpired(request, next, authService);
        }

        return throwError(error);
      })
    );
  }

  function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const handleTokenExpired = (request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> => {
    return authService.refreshAccessToken().pipe(
      switchMap(() => {
        console.log('bbbb')
        const newAccessToken = localStorage.getItem('access_token') || '';
        return next(addToken(request, newAccessToken));
      }),
      catchError((error) => {
        console.error('Error handling expired access token:', error);
        return throwError(error);
      })
    );
  }
