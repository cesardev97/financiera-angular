import { Component } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-investor-relations',
  templateUrl: './investor-relations.component.html',
  styleUrls: ['./investor-relations.component.scss']
})
export class InvestorRelationsComponent {

  breadcrumbs: string[] = [];
  acf: any = {};

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getPage('relacion-con-inversionistas').subscribe(post => {
      this.acf = post.fields
    });
  }

  configInfo: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: { 
      clickable: true,
      el: '.shareholder-pagination'
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 26,
      }
    }
  };
}
