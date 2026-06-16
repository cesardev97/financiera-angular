import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InmuebleStoreService {
  private readonly _inmueblesSource = new BehaviorSubject<any[]>([]);
  private readonly _inmuebleSource = new BehaviorSubject<any>({});

  readonly inmuebles$ = this._inmueblesSource.asObservable();

  constructor() {}

  getInmuebles(): any {
    return this._inmueblesSource.getValue();
  }

  getInmueble() : any {
    return this._inmuebleSource.getValue();
  }

  addInmuebles(data: any): void {
    this._setInmuebles(data);
  }
  
  addInmueble(data: any): void {
    this._setInmueble(data);
  }

  private _setInmuebles(inmuebles: any): void {
    this._inmueblesSource.next(inmuebles);
  }

  private _setInmueble(inmueble: any): void {
    this._inmuebleSource.next(inmueble);
  }
}