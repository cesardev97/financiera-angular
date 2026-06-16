import { Component, ViewEncapsulation } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkComponent {

  breadcrumbs : string = "";
  acf         : any      = {};

  urlForm : string = "/solicitud-de-trabajo";

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage('trabaja-con-nosotros').subscribe(post => {
      this.acf = post.fields
    });
  }

  configExperience: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.experience-slider',
      clickable: true 
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 56,
      }
    }
  };

  configJoin: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: { 
      clickable: true,
      el: '.join-pagination'
    },
    breakpoints: {
      780: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    }
  };

}
