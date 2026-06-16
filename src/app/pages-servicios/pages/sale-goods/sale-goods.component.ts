import { isPlatformBrowser } from '@angular/common';
import { Component, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { HelperService } from '@shared/utils/helper-service';
import { BienProjectService } from '@ws-wordpress/bien-project.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination, Grid } from 'swiper';
SwiperCore.use([Autoplay, Pagination, Grid]);


@Component({
  selector: 'app-sale-goods',
  templateUrl: './sale-goods.component.html',
  styleUrls: ['./sale-goods.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleGoodsComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  opt: any = {};
  opt2 : any = {};
  mostViewed : any[] = [];
  
  categories : any[] = [];
  select1 : string = "";
  select2 : string = "";
  select3 : string = "";
  select4 : string = "";

  privinceFiltered : any[] = [];
  districtFiltered : any[] = [];

  isSearching: boolean = false;
  isFound: boolean = false;

  constructor(
    public hService: HelperService,
    private bpService: BienProjectService,
    private apiService: APIService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.apiService.getPage("venta-de-bienes", "servicio").subscribe(resp => {
      this.acf = resp.fields;
    });

    this.bpService.inmueblesMostViews.subscribe(items => {
      if (items && isPlatformBrowser(this.platformId)) {
        const slidesPerGroup = innerWidth > 768 ? 6 : 1;
        
        for (let i = 0; i < items.length; i+=slidesPerGroup) {
          this.mostViewed.push(items.slice(i, i + slidesPerGroup));
        }
      }
    });
  }

  foundInmbs($event: any){
    this.isFound = $event;
  }

  mostViewedSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    autoHeight: true,
    pagination: {
      el: '.viewed-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.viewed-next',
      prevEl: '.viewed-prev'
    },
    breakpoints: {
      768: {
        allowTouchMove: false
      }
    }
  };

  onSlideChange(el: any){
    el.scrollIntoView({behavior: 'smooth'});
  }
}
