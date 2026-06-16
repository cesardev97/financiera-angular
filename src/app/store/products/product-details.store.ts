import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../ws-wordpress/api.service';


@Injectable({ providedIn: 'root' })
export class ProductDetailsStore {
  private readonly _productDataStore = new BehaviorSubject<any>(null);
  private data$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private apiService : APIService) {}

  getProductStoreData(): any {
    return this._productDataStore.getValue();
  }

  addProductStoreData(data: object): void {
    this._setProductDetails(data);
  }

  private _setProductDetails(data: any): void {
    this._productDataStore.next(data);
  }
}