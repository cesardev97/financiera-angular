import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from './pages/history/history.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { WorkComponent } from './pages/work/work.component';
import { FinancesComponent } from './pages/finances/finances.component';


const routes: Routes = [
    { path: 'nuestra-historia', component: HistoryComponent, data: { animation: 'PageFormParent' } },
    { path: 'desempeno-social', component: PerformanceComponent, data: { animation: 'PageFormParent' } },
    { path: 'trabaja-con-nosotros', component: WorkComponent, data: { animation: 'PageFormParent' } },
    { path: 'finanzas-para-ti', component: FinancesComponent, data: { animation: 'PageFormParent' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieraRoutingModule { }
