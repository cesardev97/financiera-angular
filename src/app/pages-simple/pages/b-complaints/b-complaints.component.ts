import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { HelperService } from '@shared/utils/helper-service';
import { UbigeoService } from '@ws-proempresa/forms/utils/ubigeo.service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { ReclamoService } from '@ws-proempresa/forms/reclamo.service';

@Component({
  selector: 'app-b-complaints',
  templateUrl: './b-complaints.component.html',
  styleUrls: ['./b-complaints.component.scss']
})
export class ComplaintsBookComponent {

  formG!        : FormGroup;
  isSending     : boolean = false;
  successSubmit : boolean = false
  respStatus    : string = ""
  respData      : any = {}
  fileNames     : string[] = [];

  tiposReclamo  : any[] = [];

  constructor(
    public hService: HelperService,
    private formBuilder: FormBuilder,
    public ubigeo : UbigeoService,
    public utils : UtilsFormService,
    public reclamoService : ReclamoService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.formG = this.formBuilder.group({
      agency: ['', [Validators.required]],
      is_client: [1, [Validators.required]], //no borrar
      lastname1: ['', [Validators.required]],
      lastname2: ['', [Validators.required]],
      names: ['', [Validators.required]],
      is_minor: [0, [Validators.required]], //no borrar
      representative: [''],
      document_type: [, [Validators.required]],
      document_number: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      department: [, [Validators.required]],
      province: [, [Validators.required]],
      district: [, [Validators.required]],
      address: ['', [Validators.required]],
      reference: ['', [Validators.required]],
      channel_response: ['C', [Validators.required]], //no borrar
      complaint_type: [, [Validators.required]], //default first

      reason: ['', [Validators.required]],
      product: ['', [Validators.required]],
      documents: [, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      recaptcha: [null, [Validators.required]], 
      accept_policies: [false, [Validators.requiredTrue]],
    });

    this.utils.getPersonDocuments();
    this.utils.getAgencias();
    this.utils.getOperaciones()
    this.ubigeo.getDepartments();
    
    this.reclamoService.getMotivosReclamo();
    this.reclamoService.getTiposReclamo().subscribe((items:any) => {
      if (items) {
        this.tiposReclamo = items;
        this.formG.patchValue({complaint_type: this.tiposReclamo[0]})
      }
    });
  }

  onSelectDepartment(){
    this.ubigeo.getProvinces(this.formG.value['department'].codDepartamento);
  }

  onSelectProvince(){
    this.ubigeo.getDistricts(this.formG.value['department'].codDepartamento, this.formG.value['province'].codProvincia);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 2) {
      return alert('Error: Máximo 2 archivos.')
    }

    this.fileNames = []
    let sizes = 0;
    this.formG.controls['documents'].setValue(event.target.files ?? null);
    
    for (let i = 0; i < event.target.files.length; i++) {
      const name = event.target.files[i].name
      sizes += event.target.files[i].size
      if (sizes > 1e+7) { //10MB
        return alert('Error: Tamaño excedido, maximo 10MB.')
      }
      this.fileNames = [...this.fileNames,name]
    }
  }

  isMinor(event: any) {
    const representative = this.formG.get('representative');
    
    if (event.value == 1) {
      representative?.addValidators(Validators.required);
      representative?.updateValueAndValidity();
    }
    else {
      representative?.clearValidators(); 
      representative?.updateValueAndValidity();
    }
  }

  onChangeTipo(value: any){
    if (value.idTipoReclamo == 3) {
      this.formG.get('reason')?.clearValidators();
      this.formG.get('product')?.clearValidators();
      this.formG.get('reason')?.updateValueAndValidity();
      this.formG.get('product')?.updateValueAndValidity();
    }
    else {
      this.formG.get('reason')?.setValidators([Validators.required]);
      this.formG.get('product')?.setValidators([Validators.required]);
      this.formG.get('reason')?.updateValueAndValidity();
      this.formG.get('product')?.updateValueAndValidity();
    }
  }

  send(f:FormGroupDirective){
    this.isSending = true;
    this.respStatus = "";

    if (this.formG.invalid) {
      this.isSending = false;
      this.formG.markAllAsTouched();
      return;
    }

    this.reclamoService.sendFormReclamo(this.formG.value).pipe(
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
