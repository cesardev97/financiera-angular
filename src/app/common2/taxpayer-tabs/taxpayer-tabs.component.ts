import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { HelperService } from '@shared/utils/helper-service';
import { SuccessSendDialog } from '@app-common/modal/modal.component';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { ProServiciosService } from '@ws-proempresa/forms/servicios.service';

@Component({
  selector: 'app-taxpayer-tabs',
  templateUrl: './taxpayer-tabs.component.html',
  styleUrls: ['./taxpayer-tabs.component.scss']
})
export class TaxpayerTabsComponent {

  @Input() responseType   : number = 1; //1: next-section | 2: modal
  @Input() productService : string = "";
  @Input() btnLabel       : string = "Enviar";
  @Input() isTransfer     : boolean = false;
  @Output() emailOutput = new EventEmitter<string>();
  @Output() responseOutput = new EventEmitter<any>();
  
  typeTaxPayerForm: string = 'N'; //N: Natural | J: Juridica
  formSend        : any = {};

  FormPersonG!  : FormGroup;
  FormBusinessG!: FormGroup;
  isSending     : boolean = false; 
  respStatus: string = "";

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public hService: HelperService,
    public utils : UtilsFormService,
    private servicios : ProServiciosService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.FormPersonG = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastname1: ['', [Validators.required]],
      lastname2: ['', [Validators.required]],
      document_type: [, [Validators.required]],
      document_number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.maxLength(9)]],
      accept_policies: [false, [Validators.requiredTrue]],
      recaptcha: [null, [Validators.required]],
      terms: [false, Validators.requiredTrue]
    });

    this.FormBusinessG = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastname1: ['', [Validators.required]],
      lastname2: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      business_name: ['', [Validators.required]],
      ruc: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      accept_policies: [false, [Validators.requiredTrue]],
      recaptcha: [null, [Validators.required]],
      terms: [false, Validators.requiredTrue]
    });

    if (this.isTransfer) {
      this.FormBusinessG.addControl('position_company', new FormControl('', Validators.required));
    }

    this.utils.getPersonDocuments();
  }
  
  send(f:FormGroupDirective) {
    this.isSending = true;
    this.respStatus = "";

    if (this.FormPersonG.invalid && this.typeTaxPayerForm === 'N') {
      this.FormPersonG.markAllAsTouched();
      return;
    }

    if (this.FormBusinessG.invalid && this.typeTaxPayerForm === 'J') {
      this.FormBusinessG.markAllAsTouched();
      return;
    }

    const options = {
      origen: 'SERVICIOS',
      nomProduct: this.productService
    }

    this.servicios.sendFormServicios(f.value, options, this.typeTaxPayerForm).pipe(
      catchError((error: HttpErrorResponse) => {
        this.isSending = false;
        this.respStatus = 'Incoveniente al enviar datos, vuelva a intentar'
        if (this.responseType == 1) {
          setTimeout(() => {
            scrollTo(0,this.document.body.scrollHeight);
          }, 500);
        }
        return throwError(() => error.error)
      })
    )
    .subscribe(resp => {
      this.isSending = false;

      if (this.responseType == 1) {
        this.emailOutput.emit(f.value.email)
        this.responseOutput.emit(resp.result)
      }
      else{
        this.dialog.open(SuccessSendDialog, {
          data: { email: f.value.email, type: 'contact', response: resp.result },
        });
      }
      f.resetForm();
    })
  }
}
