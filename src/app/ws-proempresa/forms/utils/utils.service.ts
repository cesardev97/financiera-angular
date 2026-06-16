import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthTokenService } from '@ws-proempresa/authentication/_auth.service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UtilsFormService {
  private proempresaURL = environment.proempresaFormsWS.URL;
  protected readonly http: HttpClient;
  
  private readonly _documentsSource = new BehaviorSubject<any>(null);
  private readonly _agenciasSource = new BehaviorSubject<any>(null);
  private readonly _operacionesSource = new BehaviorSubject<any>(null);

  public personDocuments : any[] = [];
  public agenciasList    : any[] = [];
  public operaciones     : any[] = [];
 

  constructor(tokenHandler : TokenHandler, private _authToken : AuthTokenService) { this.http = new HttpClient(tokenHandler)}

  getAgencias(){
    this.agenciasList = this._agenciasSource.getValue()
    if (!this.agenciasList) {
      const url = `${this.proempresaURL}/proempresa/experiencia/agencia/v1.0/consultar`;
      this.http.get<any>(url).subscribe(resp => {
        this.agenciasList = resp.result;
        return this._agenciasSource.next(this.agenciasList);
      })
    }
  }

  getPersonDocuments(){
    this.personDocuments = this._documentsSource.getValue()
    if (!this.personDocuments) {
      const url = `${this.proempresaURL}/proempresa/experiencia/persona/v1.0/documento/consultar`;
      this.http.get<any>(url).subscribe(resp => {
        this.personDocuments = resp.result;
        return this._documentsSource.next(this.personDocuments);
      })
    }
  }

  getOperaciones(){
    this.operaciones = this._operacionesSource.getValue()
    if (!this.operaciones) {
      const url = `${this.proempresaURL}/proempresa/experiencia/servicio/v1.0/consultar`;
      this.http.get<any>(url).subscribe(resp => {
        this.operaciones = resp.result;
        return this._operacionesSource.next(this.operaciones);
      })
    }
  }
}