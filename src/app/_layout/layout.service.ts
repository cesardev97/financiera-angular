import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private baseURL = environment.wordpressWS;

  constructor(private http: HttpClient) { }

  getMenu(menu: string):Observable<any>{
    const url = `${this.baseURL}/wp-json/api/menu?name=${menu}`;
    return this.http.get<any>(url);
  }

  searchSuggestions(termino: string):Observable<any>{
    const url = `${this.baseURL}/wp-json/api/search?s=${termino}`;
    return this.http.get<any>(url);
  }

}
