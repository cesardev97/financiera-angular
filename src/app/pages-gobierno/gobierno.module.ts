import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonPageModule } from '../common/common-page.module';
import { MatDialogModule } from '@angular/material/dialog';

import { DirectoryComponent } from './pages/directory/directory.component';
import { FinanceInfoComponent } from './pages/finance-info/finance-info.component';
import { AnualMemoriesComponent } from './pages/anual-memories/anual-memories.component';
import { InvestorRelationsComponent } from './pages/investor-relations/investor-relations.component';
import { PortalsmvComponent } from './pages/portalsmv/portalsmv.component';
import { GCRoutingModule } from './gc-routing.module';



@NgModule({
  declarations: [
    DirectoryComponent,
    FinanceInfoComponent,
    AnualMemoriesComponent,
    InvestorRelationsComponent,
    PortalsmvComponent,
  ],
  imports: [
    CommonModule,
    CommonPageModule,
    SwiperModule,
    MatTabsModule,
    MatDialogModule,
    GCRoutingModule
  ],
  entryComponents:[
  ],
})
export class GobiernoModule { }
