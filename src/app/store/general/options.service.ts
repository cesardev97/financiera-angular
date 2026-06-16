import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class OptionsStoreService {
  private readonly _optionSource = new BehaviorSubject<any>({});
  public _logoSource = new BehaviorSubject<string>("");
  public _modulePage = new BehaviorSubject<string>("");
  public _firstLoad = new BehaviorSubject<boolean>(true);

  constructor() {}

  getLogo(): Observable<any> {
    return this._logoSource.asObservable();
  }

  addLogo(value: string): void {
    this._setLogo(value);
  }

  private _setLogo(logo: any): void {
    this._logoSource.next(logo);
  }

  getModuleValue() {
    return this._modulePage.getValue()
  }
  
  addModulePage(value: string): void {
    this._setModulePage(value);
  }

  private _setModulePage(module: string): void {
    this._modulePage.next(module);
  }

  getIsFirstLoad() {
    return this._firstLoad.getValue();
  }

  addFirstLoad(data: boolean): void {
    this._setFirstLoad(data);
  }

  private _setFirstLoad(options: boolean): void {
    this._firstLoad.next(options);
  }
}