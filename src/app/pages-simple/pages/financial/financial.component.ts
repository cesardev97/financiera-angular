import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { HelperService } from '@shared/utils/helper-service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { FinancieraService } from '@ws-proempresa/forms/financiera.service';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent {

  formG!       : FormGroup;
  isSending    : boolean = false;
  respStatus  : string = ""
  urlBack      : string = "/ayuda-y-contacto/soluciones-financieras";
  successSubmit: boolean = false
  respData     : any = {}

  constructor(
    public hService: HelperService,
    private formBuilder: FormBuilder,
    public utils : UtilsFormService,
    private financiera : FinancieraService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.formG = this.formBuilder.group({
      type_document: [, [Validators.required]],
      document_number: ['', [Validators.required]],
      names: ['', [Validators.required]],
      lastname1: ['',Validators.required],
      lastname2: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      product: [, [Validators.required]],  
      recaptcha: [null, [Validators.required]],      
      policies: [false, [Validators.requiredTrue]],
    });

    this.utils.getPersonDocuments();
    this.utils.getOperaciones();

  }

  send(f:FormGroupDirective){
    this.respStatus = "";
    this.isSending = true;
    if (this.formG.invalid) {
      this.formG.markAllAsTouched();
      return;
    }
    
    this.financiera.sendFormFinanciera(this.formG.value).pipe(
      catchError((error: HttpErrorResponse) => {
        this.isSending = false;
        this.respStatus = 'Incoveniente al enviar datos, vuelva a intentar'
        setTimeout(() => {
          scrollTo(0,this.document.body.scrollHeight);
        }, 500);
        return throwError(() => error.error)
      })
    )
    .subscribe(resp => {
      this.isSending = false;
      this.successSubmit = true;
      this.respData = resp.result
      f.resetForm();
    })
  }

}
