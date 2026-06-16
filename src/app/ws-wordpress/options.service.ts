import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '@shared/utils/helper-service';
import { catchError, map, Observable, shareReplay } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APISharedService {
  private baseURL = environment.wordpressWS;

  private cache$!: Observable<any>;
  private cache2$!: Observable<any>;
  private cache3$!: Observable<any>;
  private CACHE_SIZE = 1;

  constructor(private http: HttpClient, private hService: HelperService) { }

  getOptionFields(fields: string, id: string = "options"):Observable<any> {
    const url = `${this.baseURL}/wp-json/api/options/${id}?fields=${fields}`;
    return this.http.get<any>(url);
  }

  get options() {
    if (!this.cache$) {
      this.cache$ = this.requestOptions().pipe(
        shareReplay(this.CACHE_SIZE)
      );
    }
    return this.cache$;
  }

  get options2() {
    if (!this.cache2$) {
      this.cache2$ = this.requestOptions("options-2").pipe(
        shareReplay(this.CACHE_SIZE)
      );
    }
    return this.cache2$;
  }

  get options3() {
    if (!this.cache3$) {
      this.cache3$ = this.requestOptions("options-3").pipe(
        shareReplay(this.CACHE_SIZE)
      );
    }
    return this.cache3$;
  }

  private requestOptions(id: string = "options") {
    return this.http.get<any>(`${this.baseURL}/wp-json/api/options/${id}`).pipe(
      map(response => response)
    );
  }
}
