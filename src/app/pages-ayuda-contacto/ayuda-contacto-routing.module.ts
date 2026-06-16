import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsComponent } from './pages/payments/payments.component';
import { FinancialSolutionsComponent } from './pages/financial-solutions/financial-solutions.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { InterestLinksComponent } from './pages/interest-links/interest-links.component';
import { FindUsComponent } from './pages/find-us/find-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FindEdnComponent } from './pages/find-edn/find-edn.component';
import { ReclamationComponent } from './pages/reclamation/reclamation.component';

const routes: Routes = [
  { path: 'encuentranos', component: FindUsComponent, data: { animation: 'pageAnimation16' } },
  { path: 'canales-de-pago', component: PaymentsComponent, data: { animation: 'pageAnimation17' } },
  { path: 'soluciones-financieras', component: FinancialSolutionsComponent, data: { animation: 'pageAnimation18' } },
  { path: 'encuentra-tu-edn', component: FindEdnComponent, data: { animation: 'pageAnimation19' } },
  { path: 'libro-de-reclamaciones', component: ReclamationComponent, data: { animation: 'pageAnimation20' } },
  { path: 'canal-de-denuncias', component: ComplaintsComponent, data: { animation: 'pageAnimation21' } },
  { path: 'enlaces-de-tu-interes', component: InterestLinksComponent, data: { animation: 'pageAnimation22' } },
  { path: 'preguntas-frecuentes', component: FaqComponent, data: { animation: 'pageAnimation23' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AyudaContactoRoutingModule { }
