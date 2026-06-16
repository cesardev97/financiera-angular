import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentScheduleComponent } from '../payment-schedule/payment-schedule.component';
import { isPlatformBrowser } from '@angular/common';
import { HelperService } from '@shared/utils/helper-service';

@Component({
  selector: 'simulator-results',
  templateUrl: './simulator-results.component.html',
  styleUrls: ['./simulator-results.component.scss', './../partials.scss']
})
export class SimulatorResultsComponent {

  @Input() results : any = {};
  cuotaMensual  : number = 0;
  tcea          : number = 0;

  constructor(
    private dialog: MatDialog, 
    public hpSer : HelperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (this.results?.cronograma) {
      this.cuotaMensual = this.results?.cronograma[this.results?.cronograma.length -1].impCuotaCrg
      this.tcea = this.results?.cronograma[0].tcea
    }
  }

  seePaymentSchedule(){
    this.dialog.open(PaymentScheduleComponent, {
      data: {
        currency: this.results.currSymb,
        amount: this.results.amount, 
        tea: this.results.tea,
        installments: this.results.installments,
        disbursement_date: this.results.disbursement_date,
        tcea: this.hpSer.toFloat(this.tcea),
        cronograma: this.results?.cronograma,
        cuota_mensual: this.cuotaMensual
      }
    });
  }

  goFormRequest(){
    if (isPlatformBrowser(this.platformId)) {
      const section = document.querySelector('#form-request');
      section?.scrollIntoView()
    }
  }
}
