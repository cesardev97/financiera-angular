import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { DirectivesComponent } from './pages/directives/directives.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { TCServiceComponent } from './pages/tc-service/tc-service.component';
import { ArchRightsComponent } from './pages/arch-rights/arch-rights.component';


const routes: Routes = [
  { path: 'tasas-tarifas-y-contratos', component:  ContractsComponent, data: { animation: 'PageFormParent' } },
  { path: 'uso-de-cookies', component: CookiesComponent, data: { animation: 'PageFormParent' } },
  { path: 'directivas-de-seguridad-de-la-informacion', component: DirectivesComponent, data: { animation: 'PageFormParent' } },
  { path: 'politica-de-proteccion-de-datos-personales', component: PoliciesComponent, data: { animation: 'PageFormParent' } },
  { path: 'terminos-y-condiciones-de-anuncios', component: TCServiceComponent, data: { animation: 'PageFormParent' } },
  { path: 'solicitud-de-derecho-arco', component: ArchRightsComponent, data: { animation: 'PageFormParent' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransparenciaRoutingModule { }
