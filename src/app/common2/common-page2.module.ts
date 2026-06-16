import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SuccessFormComponent } from './success-form/success-form.component';
import { TaxpayerTabsComponent } from './taxpayer-tabs/taxpayer-tabs.component';

import { CardInmbComponent } from './card-inmb-project/card-inmb-project.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormSearchComponent } from './form-search/form-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    DropzoneComponent,
    SuccessFormComponent,
    TaxpayerTabsComponent,
    CardInmbComponent,
    FormSearchComponent
  ],
  exports: [
    SuccessFormComponent,
    DropzoneComponent,
    TaxpayerTabsComponent,
    CardInmbComponent,
    FormSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxDropzoneModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ]
})
export class CommonPage2Module { }
