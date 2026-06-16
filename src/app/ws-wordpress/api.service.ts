import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HelperService } from '@shared/utils/helper-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private baseURL = environment.wordpressWS;

  constructor(
    private http: HttpClient,  
    private hService: HelperService) { }

  getPage(name: string, type: string = "page"):Observable<any>{
    const url = `${this.baseURL}/wp-json/api/pages/${type}/${name}`;
    return this.http.get<any>(url).pipe(
      catchError(this.hService.handleError)
    )
  }
  
  getForm(argument: string):Observable<any>{
    const url = `${this.baseURL}/wp-json/api/form/${argument}`;
    return this.http.get<any>(url);
  }

  sendForm(id: number, formValues: any):Observable<any>{
    const url = `${environment.wordpressWS}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`;
    const formData = new FormData();
    
    for (const field in formValues) {
      if (/date/.test(field)) {
        formValues[field] = moment(formValues[field]).format('DD/MM/YYYY');
      }
      formData.append(field, formValues[field]);
    }
    
    return this.http.post<any>(url, formData).pipe(
      catchError(this.hService.handleError)
    );
  }

  searchExecutive(dni : number){
    const url = `${this.baseURL}/wp-json/api/encuentraedn/${dni}`;
    return this.http.get<any>(url).pipe(
      catchError(this.hService.handleError)
    )
  }
}
