import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InmbProjectStoreService {
  private readonly _inmbprojectSource = new BehaviorSubject<any>(null);

  constructor() {}

  getInmbProject() : any {
    return this._inmbprojectSource.getValue();
  }

  addInmbProject(data: any): void {
    this._setInmbProject(data);
  }

  private _setInmbProject(inmbProject: any): void {
    this._inmbprojectSource.next(inmbProject);
  }
}