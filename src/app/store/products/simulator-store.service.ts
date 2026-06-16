import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SimulatorStore {
  private readonly _simulatorSource = new BehaviorSubject<any[]>([]);
  private readonly _projectAmount = new BehaviorSubject<any>(null);


  constructor() {}

  getSimulator(): Observable<any> {
    return this._simulatorSource.asObservable();
  }
  
  addSimulator(data: any[]): void {
    this._setSimulator(data);
  }
  
  private _setSimulator(tipo: any): void {
    this._simulatorSource.next(tipo);
  }

  getProjectAmount(): Observable<any> {
    return this._projectAmount.asObservable();
  }

  addProjectAmount(data: any):void {
    this._setProjectAmount(data);
  }

  private _setProjectAmount(value: any): void {
    this._projectAmount.next(value)
  }
}