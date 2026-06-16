import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single/single.component';
import { CommonPageModule } from '../common/common-page.module';
import { RouterModule } from '@angular/router';
import { SimulatorModule } from '../simulators/simulators.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SwiperModule } from 'swiper/angular';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    SingleProductComponent,
  ],
  imports: [
    CommonModule,
    CommonPageModule,
    RouterModule,
    MatTabsModule,
    MatSelectModule,
    SimulatorModule,
    SwiperModule
  ],

})
export class ProductosModule { }
