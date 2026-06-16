import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonPageModule } from '../common/common-page.module';

import { SiteHeaderComponent } from './site-header/site-header.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { PipesModule } from '../pipes/pipes.module';
import { HoverClassDirective } from '@shared/utils/hover-class.directive';
import { SimpleLayoutComponent } from './_simple-layout/simple-layout.component';
import { SwiperModule } from 'swiper/angular';
import { HomeComponent } from './home/home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    HeaderMenuComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SimpleLayoutComponent,
    HoverClassDirective,
    HomeComponent
  ],
  exports: [
    SimpleLayoutComponent,
    HomeComponent,
    SiteHeaderComponent,
    SiteFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    CommonPageModule,
    PipesModule,
    MatExpansionModule,
    MatSidenavModule
  ]
})
export class LayoutModule { }
