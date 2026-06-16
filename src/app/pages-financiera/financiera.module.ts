import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';
import { CommonPageModule } from '../common/common-page.module';

import { HistoryComponent } from './pages/history/history.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { WorkComponent } from './pages/work/work.component';
import { RouterModule } from '@angular/router';
import { FinancieraRoutingModule } from './financiera-routing.module';

@NgModule({
  declarations: [
    HistoryComponent,
    PerformanceComponent,
    FinancesComponent,
    WorkComponent,
  ],
  imports: [
    CommonModule,
    CommonPageModule,
    SwiperModule,
    RouterModule,
    FinancieraRoutingModule
  ],
})
export class FinancieraModule { }
