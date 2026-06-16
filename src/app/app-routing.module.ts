import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { Page404Component } from './shared/page-404/page-404.component';
import { PageMaintenanceComponent } from './shared/page-maintenance/page-maintenance.component';

import { SingleProductComponent } from './productos/single/single.component';
import { FinancialComponent } from './pages-simple/pages/financial/financial.component';
import { ComplaintsBookComponent } from './pages-simple/pages/b-complaints/b-complaints.component';
import { JobRequestComponent } from './pages-simple/pages/job-request/job-request.component';
import { ArchRequestComponent } from './pages-simple/pages/arch-request/arch-request.component';
import { ProductRequestComponent } from './pages-simple/pages/product-request/product-request.component';
import { ProjectsComponent } from './pages-simple/pages/projects/projects.component';
import { InmuebleProjectComponent } from './pages-simple/pages/inmueble-project/inmueble-project.component';
import { HomeComponent } from './_layout/home/home.component';

const routes: Routes = [
  {
    path: 'negocios',
    children: [
      { path: '', component: HomeComponent, data: { animation: 'PageFormParent' } },
      { path: 'proyectos-conglomerados', component: ProjectsComponent, data: { animation: 'PageFormParent' } },
      { path: 'proyectos-conglomerados/:id', component: InmuebleProjectComponent, data: { type: 'PROJ', animation: 'PageFormParent' } },
      { path: 'producto/:prod', component: SingleProductComponent, data: { animation: 'PageFormParent' } },
      { path: 'solicitud-de-producto/:prod', component: ProductRequestComponent, data: { animation: 'PageForm' } },
    ]
  },
  {
    path: '',
    children: [
      { path: '', 
        component: HomeComponent,
        data: { animation: 'PageFormParent' }
      },
      {
        path: '',
        loadChildren: () => import('./pages-financiera/financiera.module').then(m=>m.FinancieraModule),
      },
      { path: '', 
        loadChildren: () => import('./pages-gobierno/gobierno.module').then(m=>m.GobiernoModule),
      },
      { path: 'ayuda-y-contacto', 
        loadChildren: () => import('./pages-ayuda-contacto/ayuda-contacto.module').then(m=>m.PagesAyudaContactoModule) 
      },
      {
        path: 'transparencia',
        loadChildren: () => import('./pages-transparencia/transparencia.module').then(m=>m.TransparenciaModule)
      },
      { path: 'servicio', 
        loadChildren: () => import('./pages-servicios/services.module').then(m=>m.PagesServicesModule) 
      },
      { path: 'producto/:prod', component: SingleProductComponent, data: { animation: 'PageFormParent' }},

      { path: 'solicitud/trabaja-con-nosotros', component: JobRequestComponent, data: { animation: 'PageForm' } },
      { path: 'solicitud/reprogramacion-de-deuda', component: FinancialComponent, data: { animation: 'PageForm' } },
      { path: 'solicitud/libro-de-reclamaciones', component: ComplaintsBookComponent, data: { animation: 'PageForm' } },
      { path: 'solicitud/derecho-de-arco', component: ArchRequestComponent, data: { animation: 'PageForm' } },
      { path: 'solicitud-de-trabajo', component: JobRequestComponent, data: { animation: 'PageForm' } },

      { path: 'solicitud-de-producto/:prod', component: ProductRequestComponent, data: { animation: 'PageForm' } },
      { path: 'pagina-en-mantenimiento', component: PageMaintenanceComponent },
      { path: '**', component: Page404Component },
    ]
  },
  {
    path: '**',
    component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

