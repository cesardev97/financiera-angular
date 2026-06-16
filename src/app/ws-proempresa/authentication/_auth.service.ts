import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

const { tokenURL, credentials } = environment.proempresaFormsWS;

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  public accessToken : string = '';

  private readonly _tokenSource = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  
  saveToken(token: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  geToken(){
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN_KEY)
    }
    return false;
  }
  
  saveRefreshToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(REFRESHTOKEN_KEY);
      localStorage.setItem(REFRESHTOKEN_KEY, token);
    }
  }
  
  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(REFRESHTOKEN_KEY);
    }
    return null
  }

  generateToken(){
    const body = new HttpParams()
    .set('client_id', credentials.cliend_id)
    .set('client_secret', credentials.client_secret)
    .set('grant_type', 'password')
    .set('username', 'ext_solera')
    .set('password', 'ext_solera')
    .set('scope', 'openid')
  
    return this.http.post<any>(`${tokenURL}/oauth2/token`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }
}