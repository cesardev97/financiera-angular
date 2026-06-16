import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SoatStoreService {
  private readonly _soatSource = new BehaviorSubject<any[]>([]);

  readonly tiposSoat$ = this._soatSource.asObservable();

  constructor() {}


  getTipoSoat() : any {
    return this._soatSource.getValue();
  }
  
  addTipoSoat(data: any[]): void {
    this._setTiposSoat(data);
  }

  private _setTiposSoat(tipo: any): void {
    this._soatSource.next(tipo);
  }
}