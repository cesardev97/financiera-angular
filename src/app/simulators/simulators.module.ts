import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SimulatorGeneralComponent } from './simulator-general/simulator-general.component';
import { SimulatorResultsComponent } from './_partials/simulator-results/simulator-results.component';
import { PaymentScheduleComponent } from './_partials/payment-schedule/payment-schedule.component';
import { MaterialModules } from '@shared/shared.module';



@NgModule({
  declarations: [
    SimulatorResultsComponent,
    PaymentScheduleComponent,
    SimulatorGeneralComponent
  ],
  exports: [
    SimulatorGeneralComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ]
})
export class SimulatorModule { }
