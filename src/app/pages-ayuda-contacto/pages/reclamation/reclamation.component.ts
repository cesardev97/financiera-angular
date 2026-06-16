import { Component } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent {

  acf  : any = {};
  urlForm = '/solicitud/libro-de-reclamaciones';

  constructor(private apiService: APIService) { }
  
  ngOnInit(): void {
    this.apiService.getPage("ayuda-y-contacto_libro-de-reclamaciones").subscribe(resp => {
      this.acf = resp.fields;
    });
  }

  differencesSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.differences-pagination',
      clickable: true
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 2.2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      }
    }
  };

  attentionSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.attention-pagination',
      clickable: true
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 2.2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      }
    }
  };

}
