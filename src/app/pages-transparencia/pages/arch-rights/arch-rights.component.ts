import { Component } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-arch-rights',
  templateUrl: './arch-rights.component.html',
  styleUrls: ['./arch-rights.component.scss']
})
export class ArchRightsComponent {

  formUrl : string = "/solicitud/derecho-de-arco";
  acf : any = {};
  opt : any = {};

  constructor(
    private apiService : APIService,
    private sharedService: APISharedService
  ) { }

  ngOnInit(): void {
    const slug = "transparencia_solicitud-de-derecho-arco"
    this.apiService.getPage(slug).subscribe(resp => {
      this.acf = resp.fields;
    });
  
    this.sharedService.options.subscribe(resp => this.opt = resp);
  }

  archsSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.arch-next',
      prevEl: '.arch-prev',
    },
    pagination: { 
      el: '.arch-pagination',
      clickable: true 
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      780: {
        slidesPerView: 2,
        spaceBetween: 40,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 3,
      }
    }
  };

}
