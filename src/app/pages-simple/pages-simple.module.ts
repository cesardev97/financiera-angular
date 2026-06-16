import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS, RecaptchaFormsModule } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

import { CommonPageModule } from '../common/common-page.module';
import { CommonPage2Module } from '../common2/common-page2.module';

import { LayoutModule } from '../_layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { JobRequestComponent } from './pages/job-request/job-request.component';
import { FinancialComponent } from './pages/financial/financial.component';
import { ComplaintsBookComponent } from './pages/b-complaints/b-complaints.component';
import { ArchRequestComponent } from './pages/arch-request/arch-request.component';
import { ProductRequestComponent } from './pages/product-request/product-request.component';
import { FormOneComponent } from './pages/product-request/_partials/form-one/form-one.component';
import { FormThreeComponent } from './pages/product-request/_partials/form-two/form-two.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SwiperModule } from 'swiper/angular';
import { InmbFilterComponent } from './pages/inmb-filter/inmb-filter.component';
import { InmuebleProjectComponent } from './pages/inmueble-project/inmueble-project.component';

@NgModule({
  declarations: [
    JobRequestComponent,
    FinancialComponent,
    ComplaintsBookComponent,
    ArchRequestComponent,
    ProductRequestComponent,
    FormOneComponent,
    FormThreeComponent,
    ProjectsComponent,
    InmbFilterComponent,
    InmuebleProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonPageModule,
    CommonPage2Module,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SwiperModule,
    SharedModule,
    PipesModule
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
export class PagesSimpleModule { }
