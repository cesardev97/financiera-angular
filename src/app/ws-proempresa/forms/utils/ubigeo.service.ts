import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthTokenService } from '@ws-proempresa/authentication/_auth.service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UbigeoService {
  private proempresaURL = environment.proempresaFormsWS.URL;
  protected readonly http: HttpClient;

  private readonly _departmentsSoruce = new BehaviorSubject<any>(null);
  
  public departments : any[] = [];
  public provinces   : any[] = [];
  public districts   : any[] = [];

  constructor(tokenHandler : TokenHandler, private _authToken : AuthTokenService) { this.http = new HttpClient(tokenHandler)}

  getDepartments(){
    this.departments = this._departmentsSoruce.getValue()
    if (!this.departments) {
      const url = `${this.proempresaURL}/proempresa/experiencia/ubigeo/v1.0/departamento/consultar`;
      this.http.get<any>(url).subscribe(resp => {
        this.departments = resp.result;
        return this._departmentsSoruce.next(this.departments);
      })
    }
  }

  getProvinces(codDepartment : string){
    this.provinces = []
    this.districts = []
    const url = `${this.proempresaURL}/proempresa/experiencia/ubigeo/v1.0/provincia/consultar?codDepartamento=${codDepartment}`;
    return this.http.get<any>(url).subscribe(resp => {
      this.provinces = resp.result;
    })
  }

  getDistricts(codDepartment : string, codProvince : string){
    this.districts = []
    const url = `${this.proempresaURL}/proempresa/experiencia/ubigeo/v1.0/distrito/consultar?codDepartamento=${codDepartment}&codProvincia=${codProvince}`;
    return this.http.get<any>(url).subscribe(resp => {
      this.districts = resp.result;
    })
  }

  getUbigeobyCod(id: string, codigo : string = ''){
    const url = `${this.proempresaURL}/proempresa/experiencia/ubigeo/v1.0/consultar?codIdentidad=${id}&codigo=${codigo}`;
    return this.http.get<any>(url)
  }

  getAgencybyCod(codigo : string){
    const url = `${this.proempresaURL}/proempresa/experiencia/agencia/v1.0/codigo/consultar?codAgencia=${codigo}`
    return this.http.get<any>(url)
  }
  
  getAgencyByUbigeo(ubigeo : string){
    const url = `${this.proempresaURL}/proempresa/experiencia/agencia/v1.0/ubigeo/consultar?ubigeo=${ubigeo}`;
    return this.http.get<any>(url)
  }


}