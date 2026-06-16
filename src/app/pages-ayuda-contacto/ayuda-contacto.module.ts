import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsComponent } from './pages/payments/payments.component';
import { FinancialSolutionsComponent } from './pages/financial-solutions/financial-solutions.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { InterestLinksComponent } from './pages/interest-links/interest-links.component';
import { FindUsComponent } from './pages/find-us/find-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FindEdnComponent } from './pages/find-edn/find-edn.component';
import { ReclamationComponent } from './pages/reclamation/reclamation.component';
import { CommonPageModule } from '../common/common-page.module';
import { SwiperModule } from 'swiper/angular';
import { MaterialModules } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AyudaContactoRoutingModule } from './ayuda-contacto-routing.module';
import { MapService } from '@ws-proempresa/forms/utils/map.service';

@NgModule({
  declarations: [
    PaymentsComponent,
    FinancialSolutionsComponent,
    ComplaintsComponent,
    InterestLinksComponent,
    FindUsComponent,
    FaqComponent,
    FindEdnComponent,
    ReclamationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    CommonPageModule,
    MaterialModules,
    PipesModule,
    AyudaContactoRoutingModule
  ],
  providers: [
    MapService
  ]
})
export class PagesAyudaContactoModule { }
