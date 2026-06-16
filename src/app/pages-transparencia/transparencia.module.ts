import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPageModule } from '../common/common-page.module';
import { SwiperModule } from 'swiper/angular';
import { ArchRightsComponent } from './pages/arch-rights/arch-rights.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { DirectivesComponent } from './pages/directives/directives.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { TCServiceComponent } from './pages/tc-service/tc-service.component';
import { TransparenciaRoutingModule } from './transparencia-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    ArchRightsComponent,
    ContractsComponent,
    CookiesComponent,
    DirectivesComponent,
    PoliciesComponent,
    TCServiceComponent
  ],
  imports: [
    CommonModule,
    CommonPageModule,
    SwiperModule,
    MatTabsModule,
    PipesModule,
    TransparenciaRoutingModule
  ]
})
export class TransparenciaModule { }
