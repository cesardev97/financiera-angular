import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HelperService } from '@shared/utils/helper-service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { UbigeoService } from '@ws-proempresa/forms/utils/ubigeo.service';
import { ProductRequestService } from '@ws-proempresa/forms/product-req.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form-request-one',
  templateUrl: './form-one.component.html',
})
export class FormOneComponent {

  @Input() requestForm : any = {};
  @Output() emailOutput = new EventEmitter<string>();
  @Output() responseOutput = new EventEmitter<any>();
  
  formG!          : FormGroup;
  isSending       : boolean = false;
  respStatus      : string = "";
  isNegocioModule : boolean = false;
  optionSelected! : number;

  constructor(
    public hService     : HelperService,
    private fb          : FormBuilder,
    private formService : ProductRequestService,
    public utils        : UtilsFormService,
    public ubigeo       : UbigeoService,
    private route       : ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.route.queryParams.subscribe(params => {
      this.optionSelected = params['opcion'] || 1
      }
    );
   }

  ngOnInit(): void {
    this.formG = this.fb.group({
      product: [this.requestForm.product],
      option : [],
      names: ['', Validators.required],
      lastname1: ['', Validators.required],
      lastname2: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.maxLength(9)]],
      department: [, Validators.required],
      province: [, Validators.required],
      district: [, Validators.required],
      accept_policies: [false,Validators.requiredTrue],
      recaptcha: [null, [Validators.required]],      
      policies_productos: [false, [Validators.requiredTrue]],        
    });

    if (this.requestForm?.isNegocioModule) {
      this.isNegocioModule = true;
      this.formG.addControl('business_ruc', new FormControl('', Validators.required));
      this.formG.addControl('business_rs', new FormControl('', Validators.required));
    }
    else {
      this.formG.addControl('document_type', new FormControl(null, Validators.required));
      this.formG.addControl('document_number', new FormControl('', Validators.required));
    }

    if (this.requestForm.options?.length > 0) {
      this.optionSelected = this.optionSelected - 1;

      this.formG.patchValue({
        option : {
          id: this.optionSelected + 1, 
          value: this.requestForm.options[this.optionSelected]
        }
      })
    }


    this.utils.getPersonDocuments();
    this.ubigeo.getDepartments();
  }

  onSelectDepartment(){
    this.ubigeo.getProvinces(this.formG.value['department'].codDepartamento);
  }

  onSelectProvince(){
    this.ubigeo.getDistricts(this.formG.value['department'].codDepartamento, this.formG.value['province'].codProvincia);
  }

  async onSave() {
    this.isSending = true;
    this.respStatus = "";

    if (this.formG.invalid) {
      this.isSending = false;
      this.formG.markAllAsTouched();
      return;
    }

    const options = {
      isNegocios: this.requestForm?.isNegocioModule,
      type : this.requestForm?.type,
      product : this.requestForm?.title_short
    }
    
    this.formService.sendProductRequest(this.formG.value, options).pipe(
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
      this.emailOutput.emit(this.formG.value['email'])
      this.responseOutput.emit(resp.result)
      this.formG.reset();
    })
  }
}
