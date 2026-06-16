import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class FormRequestStore {
  private readonly _formRequestSource = new BehaviorSubject<any>(null);

  constructor() {}
  
  getFormRequest(): any {
    return this._formRequestSource.getValue();
  }

  addFormRequest(data: object): void {
    this._setFormRequest(data);
  }

  private _setFormRequest(data: any): void {
    this._formRequestSource.next(data);
  }
}