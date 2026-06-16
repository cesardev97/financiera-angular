import { Component, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { InmuebleStoreService } from '@store/personas/inmueble.service';
import { Router } from '@angular/router';

import SwiperCore, { SwiperOptions, Autoplay, Pagination, Grid } from 'swiper';
import { isPlatformBrowser } from '@angular/common';
SwiperCore.use([Autoplay, Pagination, Grid]);

@Component({
  selector: 'app-inmb-filter',
  templateUrl: './inmb-filter.component.html',
  styleUrls: ['./inmb-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InmbFilterComponent{

  breadcrumbs : string = "Personas / Servicios / Venta de bienes";

  objInmbs : any = {};
  totalSearch   : number = 0;
  inmueblesList : any[] = [];

  constructor(
    private inmueblesStore: InmuebleStoreService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.objInmbs = this.inmueblesStore.getInmuebles();
    
    if (this.objInmbs.length === 0) {
      this.route.navigate(['/servicio/venta-de-bienes']);
      return;
    }

    this.totalSearch = this.objInmbs.inmuebles?.length;
    if (isPlatformBrowser(this.platformId)) {
      const slidesPerGroup = innerWidth >= 768 ? 5 : 1;
      for (let i = 0; i < this.objInmbs.inmuebles?.length; i+=slidesPerGroup) {
        this.inmueblesList.push(this.objInmbs.inmuebles?.slice(i, i + slidesPerGroup));
      }
    }
  }

  searchSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    autoHeight: true,
    pagination: {
      el: '.search-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    navigation: {
      nextEl: '.search-next',
      prevEl: '.search-prev'
    },
    breakpoints: {
     
    }
  };

  onSlideChange(el: any){
    el.scrollIntoView({behavior: 'smooth'});
  }
}
