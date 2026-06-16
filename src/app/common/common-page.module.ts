import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { BannerPageComponent } from './banner-page/banner-page.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CookieComponent } from './cookie/cookie.component';
import { TextModalComponent, VideoModalComponent, MemberModalComponent, SearchModalComponent, DialogFindEDN, SuccessSendDialog, GalleryModalComponent, InitModalComponent } from './modal/modal.component';
import { ImageComponent } from './image/image.component';
import { FormsModule } from '@angular/forms';
import { LinksInterestComponent } from './links-interest/links-interest.component';
import { PipesModule } from '../pipes/pipes.module';
import { BlockURLComponent } from './block-url/block-url.component';
import { VideoComponent } from './video/video.component';
import { ShortTextComponent } from './short-text/short-text.component';
import { TabsComponent } from './tabs/tabs.component';
import { LinkComponent } from './link/link.component';
import { SharedModule } from '@shared/shared.module';
import { CommonPage2Module } from '../common2/common-page2.module';


@NgModule({
  declarations: [
    BannerPageComponent,
    BlockURLComponent,
    BreadcrumbsComponent,
    ImageComponent,
    LinksInterestComponent,
    VideoComponent,
    ShortTextComponent,
    TabsComponent,
    LinkComponent,
    SearchModalComponent,
    TextModalComponent,
    VideoModalComponent,
    GalleryModalComponent,
    MemberModalComponent,
    DialogFindEDN,
    SuccessSendDialog,
    CookieComponent,
    InitModalComponent,
  ],
  exports: [
    BannerPageComponent,
    BlockURLComponent,
    BreadcrumbsComponent,
    ImageComponent,
    LinksInterestComponent,
    TabsComponent,
    VideoComponent,
    ShortTextComponent,
    LinkComponent,
    CookieComponent,
    InitModalComponent,
  ],
  imports: [
    CommonModule,
    CommonPage2Module,
    RouterModule,
    SwiperModule,
    FormsModule,
    SharedModule,
    PipesModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ]
  
})
export class CommonPageModule { }
