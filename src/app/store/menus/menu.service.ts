import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MenuStoreService {
  private readonly _menuFSource = new BehaviorSubject<any[]>([]);
  private readonly _menuPersonasHSource = new BehaviorSubject<any[]>([]);
  private readonly _menuNegociosHSource = new BehaviorSubject<any[]>([]);

  constructor() {}

  getPersonasMenu(): Observable<any[]> {
    return this._menuPersonasHSource.asObservable();
  }
 
  getNegociosMenu(): Observable<any[]> {
    return this._menuNegociosHSource.asObservable();
  }

  getMenusF(): any[] {
    return this._menuFSource.getValue();
  }

  addPersonasMenu(data: any[]): void {
    this._setPersonasMenu(data);
  }

  addNegociosMenu(data: any[]): void {
    this._setNegociosMenu(data);
  }

  addMenusF(data: any[]): void {
    this._setMenuF(data);
  }

  private _setMenuF(menu: any[]): void {
    this._menuFSource.next(menu);
  }

  private _setPersonasMenu(menu: any[]): void {
    this._menuPersonasHSource.next(menu);
  }

  private _setNegociosMenu(menu: any[]): void {
    this._menuNegociosHSource.next(menu);
  }

}