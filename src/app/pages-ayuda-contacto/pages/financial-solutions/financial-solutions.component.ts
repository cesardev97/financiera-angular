import { Component, ViewEncapsulation } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';
import { APISharedService } from '@ws-wordpress/options.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-financial-solutions',
  templateUrl: './financial-solutions.component.html',
  styleUrls: ['./financial-solutions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FinancialSolutionsComponent {

  acf  : any = {};
  opt: any = {};
  opt2 : any = {}
  breadcrumbs : string = "";
  internalUrl : string = "/solicitud/reprogramacion-de-deuda"

  constructor(private sharedService: APISharedService, private apiService: APIService) { }
  
  ngOnInit(): void {
    this.apiService.getPage("ayuda-y-contacto_soluciones-financieras").subscribe(resp => {
      this.acf = resp.fields;
      
    });

    this.sharedService.options.subscribe(resp => this.opt = resp);

    this.sharedService.options2.subscribe(resp => this.opt2 = resp);
  }

  processSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.process-pagination',
      clickable: true
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      780: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      }
    }
  };


}
