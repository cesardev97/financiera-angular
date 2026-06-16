import { Component, Input, ViewEncapsulation } from '@angular/core';

import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-links-interest',
  templateUrl: './links-interest.component.html',
  styleUrls: ['./links-interest.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LinksInterestComponent {

  @Input() className : string = ""
  @Input() titleLinks: string = ""
  @Input() subtitle: string = ""
  @Input() listLinks : any[] = []

  constructor() { }

  configIntLinks: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 32,
    pagination: { 
      clickable: true,
      el: '.interest-pagination'
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
      },
      780: {
        slidesPerView: 3,
      },
      980: {
        slidesPerView: 4,
      },
      1320: {
        slidesPerView: 5,
        spaceBetween: 27,
      }
    }
  };

}
