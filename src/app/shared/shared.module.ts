import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { Page404Component } from './page-404/page-404.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { RouterModule } from '@angular/router';
import { PageMaintenanceComponent } from './page-maintenance/page-maintenance.component';
import { PageStateComponent } from './_layout/page-state.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatDialogModule } from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

export const MaterialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatDialogModule,
  MatSliderModule,
  MatTabsModule,
  MatButtonToggleModule
];
@NgModule({
  declarations: [
    PageStateComponent,
    Page404Component,
    PageErrorComponent,
    PageMaintenanceComponent,
  ],
  exports: [
    MaterialModules,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    DecimalPipe
  ]
})
export class SharedModule { }