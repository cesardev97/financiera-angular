import { Component, ViewEncapsulation } from '@angular/core';
import { HelperService } from '@shared/utils/helper-service';
import { Subject } from 'rxjs';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExchangeRateComponent {

  acf: any = {}
  breadcrumbs: string[] = [];

  labelSend  : string = ""
  labelTake  : string = ""
  flagSend   : string = ""
  flagTake   : string = ""
  codeSend   : string = ""
  codeTake   : string = ""
  symbolSend : string = ""
  symbolTake : string = ""

  dollarPurchase : number = 0;
  dollarSale : number = 0;
  sendAmount: string = "100.00";
  takeAmount: string = "0";
  
  invertCurrency: boolean = true;


  debouncer:Subject<string> = new Subject();

  constructor(
    public hService: HelperService, 
    private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage('tipo-de-cambio', "servicio").subscribe(resp => {
        this.acf = resp.fields;

        this.dollarPurchase = Number(this.acf.dollar_purchase);
        this.dollarSale = Number(this.acf.dollar_sale);

        this.setValues();
        this.invertCurrency ? this.saleDollar() : this.purchaseDollar();
      }
    );
  }

  sendConvert(){
    setTimeout(() => {
      this.invertCurrency ? this.saleDollar() : this.purchaseDollar();
    }, 1200);
  }

  takeConvert(){
    setTimeout(() => {
      this.invertCurrency ? this.saleDollar(2) : this.purchaseDollar(2);
    }, 1200);
  }

  
  switcher(){
    this.invertCurrency = !this.invertCurrency;
    this.setValues();
  }

  setValues() {
    this.labelSend  = (this.invertCurrency) ? this.acf.label_soles : this.acf.label_dollars;
    this.labelTake  = (this.invertCurrency) ? this.acf.label_dollars : this.acf.label_soles;
    this.flagSend   = (this.invertCurrency) ? this.acf.currency_flag_pe : this.acf.currency_flag_us;
    this.flagTake   = (this.invertCurrency) ? this.acf.currency_flag_us : this.acf.currency_flag_pe;
    this.codeSend   = (this.invertCurrency) ? this.acf.currency_cod_pen : this.acf.currency_cod_dollar;
    this.codeTake   = (this.invertCurrency) ? this.acf.currency_cod_dollar : this.acf.currency_cod_pen;
    this.symbolSend = (this.invertCurrency) ? this.acf.currency_symbol_pen : this.acf.currency_symbol_dollar;
    this.symbolTake = (this.invertCurrency) ? this.acf.currency_symbol_dollar : this.acf.currency_symbol_pen;
  
    this.invertCurrency ? this.saleDollar() : this.purchaseDollar();
  }

  saleDollar(option: number = 1) {
    if (option == 1) {
      this.takeAmount = (Number(this.sendAmount) / this.dollarSale).toFixed(2);
    }
    else {
      this.sendAmount = (Number(this.takeAmount) * this.dollarSale).toFixed(2);
    }
  }

  purchaseDollar(option: number = 1) {
    if (option == 1) {
      this.takeAmount = (Number(this.sendAmount) * this.dollarPurchase).toFixed(2);
    }
    else {
      this.sendAmount = (Number(this.takeAmount) / this.dollarSale).toFixed(2);

    }
  }

}
