import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperService } from '@shared/utils/helper-service';
import { AuthTokenService } from '@ws-proempresa/authentication/_auth.service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UtilsSimultatorService {
  private proempresaURL = environment.proempresaFormsWS.URL;
  protected readonly http: HttpClient;

  private readonly _itemsProductsSource = new BehaviorSubject<any>(null);
  private readonly _monedaSource = new BehaviorSubject<any>(null);
  private readonly _seguroSource = new BehaviorSubject<any>(null);

  public monedas : any[] = [];
  public seguros : any[] = [];

  constructor(
    tokenHandler : TokenHandler, 
    private _authToken : AuthTokenService,
    private hService : HelperService
  ) { this.http = new HttpClient(tokenHandler)}

  getItemsProducts(type : string){
    const products = this._itemsProductsSource.getValue()
    const typeSlug = this.hService.translateProductType(type);
    if (!products || type != products?.type) {
      const url = `${this.proempresaURL}/proempresa/experiencia/producto/v1.0/${typeSlug}/consultar`;
      this.http.get<any>(url).subscribe(resp => {
        return this._itemsProductsSource.next({list: resp.result, type});
      })
    }
    return this._itemsProductsSource.asObservable();
  }

  getMonedas(){
    this.monedas = this._monedaSource.getValue()
    if (!this.monedas) {
      const url = `${this.proempresaURL}/proempresa/experiencia/moneda/v1.0/consultar`;
      this.http.get<any>(url).subscribe(resp => {
        this.monedas = resp.result;
        return this._monedaSource.next(this.monedas);
      })
    }
  }

  getSeguros(){
    this.seguros = this._seguroSource.getValue()
    if (!this.seguros) {
      const url = `${this.proempresaURL}/proempresa/experiencia/credito/v1.0/seguro/obtener`;
      this.http.get<any>(url).subscribe(resp => {
        this.seguros = resp.result;
        return this._seguroSource.next(this.seguros);
      })
    }
  }
}