import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from '@shared/utils/helper-service';

import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss', './../partials.scss']
})
export class PaymentScheduleComponent {
  @ViewChild('TABLE', { static: false }) TABLE!: ElementRef;  

  constructor(
    public hService : HelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentScheduleComponent>, 
  ) { }

  sumTotals(property : string){
    const total = this.data.cronograma.reduce((accumulator : number, object : any) => {
      return accumulator + Number(object[property]);
    }, 0);
  
    return this.hService.toFloat(total)
  }

  closeDialog(){
    this.dialogRef.close();
  }

  exportExcel(){
    const options = {
      dateNF:'yyyy-MM-dd;@',
      raw: true
    }
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement, options); 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Cronograma');  
    XLSX.writeFile(wb, 'Cronograma_de_Pagos.xlsx');  
  }

}
