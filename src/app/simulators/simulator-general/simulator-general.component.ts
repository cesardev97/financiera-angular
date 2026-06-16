import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from '@shared/utils/helper-service';
import { UtilsSimultatorService } from '@ws-proempresa/simulators/utils/utils.service';
import { CalculosSimulator } from './calculos-simulator';
import { CronogramaService } from '../../ws-proempresa/simulators/cronograma.service';
import { AhorroSimulatorService } from '@ws-proempresa/simulators/ahorro.service';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-simulator-general',
  templateUrl: './simulator-general.component.html',
  styleUrls: ['./simulator-general.component.scss']
})
export class SimulatorGeneralComponent {

  @Input() simulator : any = {};
  @Input() isTransfer: boolean = false;

  formG!        : FormGroup;
  showResults   : boolean = false;
  results       : any = {};

  currencyCode    : string = "";
  currencySymbol  : string = "";
  showPrefixAmount: boolean = false;
  textTEA         : string = ''; 
  isShowNotice    : boolean = false;

  placeholderDeadline : string = '';
  amountClass         : string = '';
  cuotasMin : number = 6;
  cuotasMax : number = 24;
  TEAMin    : any;
  TEAMax    : any;
  MinAmount : any = '';

  minDate = new Date();

  @ViewChild('form') formEl!: FormGroupDirective;

  constructor(
    private fb        : FormBuilder,
    public dialog     : MatDialog,
    public hpServ     : HelperService,
    public utilsSimul : UtilsSimultatorService,
    private cronograma: CronogramaService,
    private ahorroSim : AhorroSimulatorService,
    private _calculos : CalculosSimulator,
    private wpService : APIService
  ) { }

  ngOnChanges(): void {
    this.placeholderDeadline  = 'Ingrese';
    this.showResults = false;

    this.setCurrencyValues(this.simulator.amount?.currency || this.simulator.currencies[0].value)

    this.formG = this.fb.group({
      product_slug: [''],
      dni: [''],
      phone: [''],
      currency: [this.currencyCode],
      amount: [this.simulator.amount?.price || '',[Validators.required]],
      accept_policies: [false],
    });

    this.getMinAmount();

    if (this.simulator.type == 'credit') {
      this.formG.addControl('tea', new FormControl('', Validators.required));
      this.formG.addControl('installments', new FormControl('', Validators.required));
      this.formG.addControl('disbursement_date', new FormControl('', Validators.required));
      this.formG.addControl('desgravamen', new FormControl('01', Validators.required));
      this.formG.addControl('insurance', new FormControl(''));

      this.getTEAValue();

      if (this.simulator.tea_dollars?.tea_min && this.simulator.tea_dollars?.tea_max) {
        this.textTEA = ('<span>TEA: Tasa efectiva anual</span><span>Soles: X1% - X2%</span><span>Dólares: X3% - X4%</span>')
          .replace('X1', this.simulator.tea_soles?.tea_min)
          .replace('X2', this.simulator.tea_soles?.tea_max)
          .replace('X3', this.simulator.tea_dollars?.tea_min)
          .replace('X4', this.simulator.tea_dollars?.tea_max)
      }
      else {
        this.textTEA = ('<span>TEA: Tasa efectiva anual</span><span>TEA Mínima: X1%</span><span>TEA Máxima: X2%</span>')
          .replace('X1', this.simulator.tea_soles?.tea_min)
          .replace('X2', this.simulator.tea_soles?.tea_max)
      }

      this.utilsSimul.getSeguros(); // Get Seguros Opcionales
    }

    if (this.simulator.type == 'saving' && !this.simulator.has_apertura) {
        this.formG.addControl('deadline_day', new FormControl('', Validators.required));
        if (this.simulator.deadline_day != '' || this.simulator.deadline_day != 0) {
          this.placeholderDeadline = `Plazo mínimo:  ${this.simulator.deadline_day || 31} días`;
        }
    }

    if (this.simulator.has_apertura) {
      this.formG.addControl('fee_amount', new FormControl('', Validators.required));
      this.formG.addControl('fee_date', new FormControl('', Validators.required));
      this.formG.addControl('cant_fees', new FormControl('', Validators.required));
    }

    if (this.simulator.type == 'other') {
        this.formG.addControl('expiration_date', new FormControl('', Validators.required));
        this.formG.addControl('ruc', new FormControl(null, Validators.required));
    }

    if (this.simulator.periodicity?.length) {
        this.formG.addControl('periodicity', new FormControl('', Validators.required));
    }
    
    if (this.simulator.has_apertura || this.simulator.type == 'other') {
      this.amountClass = 'min'
    }
    else if(this.simulator.min_amount){
      this.amountClass = 'amount-wrap'
    }
    else{
      this.amountClass = '';
    }

    if (this.simulator.amount?.currency) {
      this.showPrefixAmount = true;
    }
    else {
      this.resetForm();
    }
  }

  onInputAmount(event : any){
    return this.showPrefixAmount = event.target?.value || 0 > 0 ? true : false;
  }

  onChangeCurrency(value: string){
    if (!this.simulator.amount?.price) {
      this.formG.get('amount')?.reset();
      this.formG.get('fee_amount')?.reset();
      this.formG.get('tea')?.reset();
    }
    this.setCurrencyValues(value)
    this.getMinAmount()
    if (this.simulator.type == 'credit') {
      this.getTEAValue()
    }
  }

  onChangePeriodicity(){
    const periodicity = this.formG.value['periodicity']
    if (periodicity) {
      this.simulator.deadline_day = periodicity;
      this.formG.get('deadline_day')?.setValidators([Validators.required, this.deadLineValidator()]);
      this.placeholderDeadline = `Ingrese múltiplo de ${periodicity}`
      
      if (this.formG.get('cant_fees')) {
        this.formG.get('cant_fees')?.reset();
        this.formG.get('cant_fees')?.setValidators([Validators.required, this.cantCuotasValidator()]);

        if (periodicity == 7) {
          this.cuotasMin = 6
          this.cuotasMax = 12
        }
        else if(periodicity == 15){
          this.cuotasMin = 6
          this.cuotasMax = 12
        }
        else if(periodicity == 30){
          this.cuotasMin = 6
          this.cuotasMax = 24
        }
      }
    }
  }
  
  deadLineValidator() : ValidatorFn {  
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      const multiplo = Number(this.formG.value['periodicity']);
      
      if (!value) {
        return null;
      }
      const valid = value > 0 && value % multiplo == 0;
      return !valid ? { noMultiplo : true }: null;
    }
  }

  cantCuotasValidator() : ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      const periodicity = Number(this.formG.value['periodicity']);
      let valid = false
      if (!value) {
        return null;
      }

      if (periodicity == 7) {
        valid = value >= 6 && value <= 12
      }
      else if(periodicity == 15){
        valid = value >= 6 && value <= 12
      }
      else if(periodicity == 30){
        valid = value >= 6 && value <= 24
      }
      return !valid ? { noRange : true } : null;
    }
  }

  //Helpers
  getTEAValue(){
    if (this.currencyCode == '02') {
      this.TEAMin = this.simulator.tea_dollars?.tea_min || this.simulator.tea_soles?.tea_min
      this.TEAMax = this.simulator.tea_dollars?.tea_max || this.simulator.tea_soles?.tea_max
    }
    else {
      this.TEAMin = this.simulator.tea_soles?.tea_min
      this.TEAMax = this.simulator.tea_soles?.tea_max
    }
  }

  getMinAmount(){
    if (this.currencyCode == '02') {
      this.MinAmount = this.simulator.amount_min_dollars || this.simulator.min_amount || ''
    }
    else {
      this.MinAmount = this.simulator.min_amount || ''
    }
  }
  
  toggleNotice(){
    this.isShowNotice = !this.isShowNotice;
  }

  resetForm() {
    this.formEl?.resetForm();
    this.formG.patchValue({
      currency: this.simulator.currencies[0].value,
      desgravamen: '01'
    });
    this.showPrefixAmount = false;
    this.setCurrencyValues(this.simulator.currencies[0].value)
  }

  setCurrencyValues(code: string){
    this.currencyCode = code
    this.currencySymbol = this.hpServ.getSymbolCurrency(this.currencyCode);
  }

  async onSave(f: FormGroupDirective) {
    
    if (this.formG.invalid) {
      this.formG.markAllAsTouched();
      return;
    }

    this.formG.patchValue({ product_slug: this.simulator.productSlug })

    const showingResults = !this.showResults
    
    if (showingResults) {
      this.results = {
        ...this.formG.value,
        form_url: this.simulator.formUrl,  
        type: this.simulator.type,
        currency : this.currencyCode,
        currSymb : this.currencySymbol,
        is_transfer: this.isTransfer,
        has_apertura: this.simulator.has_apertura || false,
      };

      const amount = this.formG.value['amount'];

      if (this.isTransfer) {
        const calculos = this._calculos.calculosTransferencia(amount, this.simulator.rules);
        this.results.commission = calculos.commission
        this.results.swift = calculos.swift
        this.results.total = amount + this.results.commission + this.results.swift;

        this.showResults = showingResults
      }
      else if(this.results.type == 'credit'){
        this.cronograma.generateCronograma(this.formG.value, this.simulator.wsData).subscribe(resp => {
          if (resp) {
            this.results.tcea = resp.tcea || 0
            this.results.cronograma = resp.cronograma
            this.showResults = showingResults
          }
        })
      }
      else if(this.results.type == 'saving'){
        if (!this.simulator.wsData) {
          alert('Hay incovenientes al enviar los datos, intente nuevamente.');
          this.resetForm();
          return console.error('Falta asignar código y grupo de producto')
        }
        this.ahorroSim.validateProduct(this.formG.value, this.simulator.wsData, this.simulator.isNegocioModule)
        .subscribe(resp =>{
          if (resp) {
            this.results.tasaInteres = resp.result.tasamensual
            this.ahorroSim.sendSimulatorAhorro(resp.request, resp.result).subscribe(resp2 => {
              if (resp2) {
                this.results.ws = resp2.result
                this.showResults = showingResults
              }
            })
          }
        })
      }
      else if(this.results.type == 'other'){
        const calculos = this._calculos.calculosFactoring(amount, this.formG.value['expiration_date'], this.simulator.rules)
        this.results.calc = calculos
        this.showResults = showingResults
      }

      if (this.formG.value['dni'] && this.formG.value['phone']) {
        const values = {
          ...this.formG.value,
          product: this.simulator.product,
          amount: `${this.currencySymbol}${amount}`,
        }
        this.wpService.sendForm(this.simulator.id, values).subscribe((resp)=> {
          if (resp.status != 'mail_sent') {
            console.log(resp);
          }
        })
      }
    }
    else {
      this.showResults = showingResults
      this.resetForm();
    }
  }
}
