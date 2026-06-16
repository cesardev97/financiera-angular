import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { HelperService } from '@shared/utils/helper-service';
import { APIService } from '@ws-wordpress/api.service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { TrabajoService } from '@ws-proempresa/forms/trabajo.service';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  encapsulation: ViewEncapsulation.None
})
export class JobRequestComponent {

  acf: any = {};

  formJob!    : FormGroup;
  termsChecked: boolean = false;

  isLoaded      : boolean = true;
  isSending     : boolean = false;
  respStatus    : string = ""
  successSubmit : boolean = false

  constructor(
    public hService: HelperService,
    private apiService: APIService, 
    private formBuilder: FormBuilder,
    public utils: UtilsFormService,
    public jobService: TrabajoService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.apiService.getForm('solicitud-trabajo').subscribe(resp => {
      this.acf = resp.form_fields
    });

    this.formJob = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastname1: ['', [Validators.required]],
      lastname2: ['', [Validators.required]],
      typedocument: [, [Validators.required]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(9)]],
      career: [, [Validators.required]],
      experience: [, [Validators.required]],
      filecv: [, [Validators.required]],
      policies: [false, [Validators.requiredTrue]],
      recaptcha: [null, [Validators.required]]
    });

    this.utils.getPersonDocuments();
    this.jobService.getProfesiones();
    this.jobService.getExperiencias();
  }

  isValid(field: string){
    return this.formJob.controls[field].errors && this.formJob.controls[field].touched;
  }

  selectFile(event: any) {
    this.formJob.patchValue({
      filecv: event[0]
    })
  }

  send(f:FormGroupDirective) {
    this.isSending = true;
    this.respStatus = "";

    if (this.formJob.invalid) {
      this.isSending = false;
      this.formJob.markAllAsTouched();
      return;
    }

    this.jobService.sendFormTrabajo(f.value).pipe(
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
      f.resetForm();
    })
  }

}
