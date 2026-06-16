import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonPageModule } from '../common/common-page.module';
import { CommonPage2Module } from '../common2/common-page2.module';

import { TransfersComponent } from './_layout/transfers/transfers.component';
import { ExchangeRateComponent } from './pages/exchange-rate/exchange-rate.component';
import { TransfersAbroadComponent } from './pages/transfers-abroad/transfers-abroad.component';
import { TransfersFromAbroadComponent } from './pages/transfers-from-abroad/transfers-from-abroad.component';
import { IncomeComponent } from './pages/income/income.component';
import { RemittancesComponent } from './pages/remittances/remittances.component';
import { NationalMoneyComponent } from './pages/national-money/national-money.component';
import { SaleGoodsComponent } from './pages/sale-goods/sale-goods.component';

import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesRoutingModule } from './services-routing.module';
import { SimulatorModule } from '../simulators/simulators.module';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    ExchangeRateComponent,
    TransfersAbroadComponent,
    TransfersFromAbroadComponent,
    IncomeComponent,
    RemittancesComponent,
    NationalMoneyComponent,
    SaleGoodsComponent,
    TransfersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    MatExpansionModule,
    CommonPageModule,
    CommonPage2Module,
    SimulatorModule,
    ServicesRoutingModule
  ]
})
export class PagesServicesModule { }
