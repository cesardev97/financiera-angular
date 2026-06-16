import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  constructor(private router: Router, private _decimalPipe: DecimalPipe) {}

  public onlyNumbers(event: any) {
    let patt = /\D/;
    let value = event.key || event.target.value;
    let result = !patt.test(value);
    return result;
  }

  public onlyString(event: any){
    let patt = /^[A-ZÁÉÍÓÚÑ ]+$/i;
    let result = patt.test(event.key);
    return result;
  }

  public onlyInteger(event : any){
    const value = event.key;
    return !['.','e'].includes(value)
  }

  goLink(element: any, type?: string) {
    if (element) {
      switch (type) {
        case 'internal': // internal url
          return this.router.navigate([element])  
        case 'external': // external url
          return window.open(element)
        case 'download':
          return window.open(element)
        default: // section
          return element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }
    }
  }

  public getSymbolCurrency(value: string){
    if (value === '01') {
      return  'S/'
    }
    else if(value === '02'){
      return '$';
    }
    return value
  }

  public suma(numbers : any[]){
    
    const sum = numbers.reduce((a,b) => this.toNumber(a) + this.toNumber(b), 0)
    return this.toFloat(sum)
  }

  public toDecimal(num : number, cantDec : number){
    return Number(Math.round(num * 100) / 100).toFixed(cantDec);
  }
  
  public toPercent(num : Number){
    return this.toDecimal(Number(num) * 100, 2)
  }

  public toFloat(num : any){
    return this._decimalPipe.transform(this.toNumber(num), '1.2-2')
  }

  private toNumber(value : any){
    return typeof value == 'string' ? Number(value.replace(',', '')) : Number(value)
  }

  public selectFormImgs(type: string, creditImages: any, savingImages: any, insuranceImages: any) {
    const Images = {
      formImg: "",
      responseImg: ""
    }
    
    switch (type) {
      case 'credit':
        Images.formImg = creditImages?.form_img;
        Images.responseImg = creditImages?.response_img;
        break;
      case 'saving':
        Images.formImg = savingImages?.form_img;
        Images.responseImg = savingImages?.response_img;
        break;
      case 'insurance':
        Images.formImg = insuranceImages?.form_img;
        Images.responseImg = insuranceImages?.response_img;
        break;
      default:
        Images.formImg = creditImages?.form_img;
        Images.responseImg = creditImages?.response_img;
        break;  
    }

    return Images;
  }

  translateProductType(type : string) : string {
    switch(type){
      case 'saving':
        return 'ahorro'
      case 'credit':
        return 'credito'
      case 'insurance':
        return 'seguro'
      default:
        return 'otro'
    }
  }

  slugify(str : string) {
    return String(str)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return EMPTY;
    }
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } 
    
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}