import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthTokenService } from './_auth.service';


@Injectable({ providedIn: 'root' })
export class TokenHandler extends HttpHandler{
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private auth: AuthTokenService, 
    private next: HttpHandler, 
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) { 
    super() 
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.auth.geToken();
    if (token) {
      authReq = this.addTokenHeader(req, token)
    }

    return this.next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(authReq, this.next);
        }
        return throwError(() => error.error);
      })
    );

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.auth.getRefreshToken();
      
      if (refreshToken)
        return this.auth.generateToken().pipe(
        //return this.auth.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.auth.saveToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);
            
            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => error.error);
          })
        );
    }
  
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
  }
}