import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay } from 'rxjs';

import { HelperService } from '@shared/utils/helper-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BienProjectService {
  private baseURL = environment.wordpressWS;

  private cache$!: Observable<any>;
  private cache2$!: Observable<any>;
  private CACHE_SIZE = 1;

  constructor(private http: HttpClient, private hService: HelperService) { }

  get inmuebleCategories() {
    if (!this.cache$) {
        this.cache$ = this.http.get<any>(`${this.baseURL}/wp-json/api/inmuebles/categories`).pipe(
            shareReplay(this.CACHE_SIZE)
          )
    }
    return this.cache$;
  }

  get inmueblesMostViews() {
    if (!this.cache2$) {
      this.cache2$ = this.http.get<any>(`${this.baseURL}/wp-json/api/inmuebles`).pipe(
        shareReplay(this.CACHE_SIZE)
      )
    }
    return this.cache2$;
  }

  getFilterInmuebles(list: any[]) {
    let allowList = (list.filter(Boolean)).toString();
    
    const url = `${this.baseURL}/wp-json/api/inmuebles?location=${allowList}`;
    return this.http.get<any>(url).pipe(
      catchError(this.hService.handleError)
    )
  }

  getProjects():Observable<any> {
    const url = `${this.baseURL}/wp-json/api/projects`;
    return this.http.get<any>(url);
  }

  getBienByID(id: number, type: string){{
    const typeString = type == 'INMB' ? 'inmuebles' : 'projects';
    const url = `${this.baseURL}/wp-json/api/${typeString}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.hService.handleError)
    )
  }}


  // Utils

  orderCategories(list: any[]){
    let newList : any[] = [];
    const ubicacion = list.find(x => x.slug === 'ubicacion');
    const tipoInmueble = list.find(x => x.slug === 'tipo-de-inmueble');

    if (ubicacion && tipoInmueble) {
      newList = [tipoInmueble, ubicacion];
    }
    
    return newList;
  }

  getChildren(list: any[], id:string) {
    let children: any[] = [];
    if (id) {
      const term = list.find(x => x.id == id);
      children = term.children;
    }
    return children;
  }
}
