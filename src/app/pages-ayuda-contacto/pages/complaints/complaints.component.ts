import { Component, ViewEncapsulation } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComplaintsComponent {

  breadcrumbs : string = "";
  acf  : any = {};

  constructor(private apiService: APIService) { }
  
  ngOnInit(): void {
    this.apiService.getPage("ayuda-y-contacto_canal-de-denuncias").subscribe(resp => {
      this.acf = resp.fields;
    });
  }

  descriptionSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.description-pagination',
      clickable: true
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 24,
      }
    }
  };

  recomendationsSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.recomendations-pagination',
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
      1200: {
        slidesPerView: 4,
        spaceBetween: 24,
      }
    }
  };
}
