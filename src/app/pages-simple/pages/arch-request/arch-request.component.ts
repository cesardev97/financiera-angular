import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { HelperService } from '@shared/utils/helper-service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { ArcoService } from '@ws-proempresa/forms/arco.service';

@Component({
  selector: 'app-arch-request',
  templateUrl: './arch-request.component.html',
  styleUrls: ['./arch-request.component.scss']
})
export class ArchRequestComponent {

  formG!: FormGroup;
  successSubmit: boolean = false

  isSending   : boolean = false;
  respStatus  : string = ""
  respData    : any = {}
  fileNames   : any = []

  constructor(
    public hService: HelperService,
    private formBuilder: FormBuilder,
    public arcoService : ArcoService,
    public utils : UtilsFormService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.formG = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastname1: ['', [Validators.required]],
      lastname2: ['', [Validators.required]],
      document_type: [, [Validators.required]],
      document_number: ['', [Validators.required]],
      documents: [, [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

      legal_representative: ['N', [Validators.required]],
      repr_names: [''],
      repr_lastname1: [''],
      repr_lastname2: [''],
      repr_documentType: [],
      repr_documentNumber: [''],
      repr_documents: [],
      repr_document2: [],
      
      request_type: ['INFO', [Validators.required]],
      bank_data: [, [Validators.required]],
      description: ['', [Validators.required]],
      additional_files: [, [Validators.required]],
      recaptcha: [null, [Validators.required]],
      accept_policies: [false, [Validators.requiredTrue]],
    });

    this.utils.getPersonDocuments();
    this.arcoService.getBancoDatos();
  }

  onFileSelected(event: any, control: string) {
    this.formG.controls[control].setValue(event.target.files[0] ?? null);
  }

  onDropFile(event: any) {
    this.formG.patchValue({
      additional_files: event[0]
    })
  }

  isRepresentative() {
    const reprControls = ['repr_names', 'repr_lastname1', 'repr_lastname2', 'repr_documentType',
                          'repr_documentNumber', 'repr_documents', 'repr_document2'];

    if (this.formG.value['legal_representative'] == "S") {
      reprControls.forEach(control => {
        this.formG.get(control)?.addValidators(Validators.required);
        this.formG.get(control)?.updateValueAndValidity();
      });
    }
    else {
      reprControls.forEach(control => {
        this.formG.get(control)?.clearValidators();
        this.formG.get(control)?.updateValueAndValidity();
      });
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

    this.arcoService.sendFormDerechoArco(this.formG.value).pipe(
      catchError((error: HttpErrorResponse) => {
        this.isSending = false;
        this.respStatus = 'Incoveniente al enviar datos, vuelva a intentar'
        setTimeout(() => {
          scrollTo(0,this.document.body.scrollHeight);
        }, 500);
        return throwError(() => error.error)
      })
    ).subscribe(resp => {
      this.isSending = false;
      this.successSubmit = true;
      this.respData = resp.result
      f.resetForm();
    })
  }

}
