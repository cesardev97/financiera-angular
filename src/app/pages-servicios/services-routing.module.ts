import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from './pages/exchange-rate/exchange-rate.component';
import { IncomeComponent } from './pages/income/income.component';
import { NationalMoneyComponent } from './pages/national-money/national-money.component';
import { RemittancesComponent } from './pages/remittances/remittances.component';
import { SaleGoodsComponent } from './pages/sale-goods/sale-goods.component';
import { TransfersAbroadComponent } from './pages/transfers-abroad/transfers-abroad.component';
import { TransfersFromAbroadComponent } from './pages/transfers-from-abroad/transfers-from-abroad.component';
import { InmbFilterComponent } from '../pages-simple/pages/inmb-filter/inmb-filter.component';
import { InmuebleProjectComponent } from '../pages-simple/pages/inmueble-project/inmueble-project.component';

const routes: Routes = [
    { path: 'tipo-de-cambio', component: ExchangeRateComponent, data: { animation: 'PageFormParent' } },
    { path: 'transferencias-al-exterior', component: TransfersAbroadComponent, data: { animation: 'PageFormParent' } },
    { path: 'transferencias-del-exterior', component: TransfersFromAbroadComponent, data: { animation: 'PageFormParent' } },
    { path: 'recaudacion', component: IncomeComponent, data: { animation: 'PageFormParent' } },
    { path: 'remesas', component: RemittancesComponent, data: { animation: 'PageFormParent' } },
    { path: 'giros-nacionales', component: NationalMoneyComponent, data: { animation: 'PageFormParent' } },
    { path: 'venta-de-bienes', component: SaleGoodsComponent, data: { animation: 'PageFormParent' } },
    { path: 'venta-de-bienes/search', component: InmbFilterComponent, data: { animation: 'PageFormParent' } },
    { path: 'venta-de-bienes/:id', component: InmuebleProjectComponent, data: {type: 'INMB', animation: 'PageFormParent' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
