import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnualMemoriesComponent } from './pages/anual-memories/anual-memories.component';
import { DirectoryComponent } from './pages/directory/directory.component';
import { FinanceInfoComponent } from './pages/finance-info/finance-info.component';
import { InvestorRelationsComponent } from './pages/investor-relations/investor-relations.component';
import { PortalsmvComponent } from './pages/portalsmv/portalsmv.component';


const routes: Routes = [
    { path: 'nuestro-directorio', component: DirectoryComponent, data: { animation: 'pageAnimation5' } },
    { path: 'informacion-financiera', component: FinanceInfoComponent, data: { animation: 'pageAnimation6' } },
    { path: 'memorias-anuales', component: AnualMemoriesComponent, data: { animation: 'pageAnimation7' } },
    { path: 'relacion-con-inversionistas', component: InvestorRelationsComponent, data: { animation: 'pageAnimation8' } },
    { path: 'portal-smv', component: PortalsmvComponent, data: { animation: 'pageAnimation9' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GCRoutingModule { }
