import { Component, ViewEncapsulation } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  opt: any = {};
  opt2 : any = {}

  constructor(private sharedService: APISharedService, private apiService: APIService) { }
  
  ngOnInit(): void {
    this.apiService.getPage("recaudacion", "servicio").subscribe(resp => {
      this.acf = resp.fields;
    });

    this.sharedService.options.subscribe(resp => this.opt = resp);

    this.sharedService.options2.subscribe(resp => this.opt2 = resp);
  }

  swiperBenefits: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.benefits-pagination',
      clickable: true
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 0,
      }
    }
  };

  modalitiesSlider: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.modalities-pagination',
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 24,
      }
    }
  };

}
