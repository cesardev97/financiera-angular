import { Component, ViewEncapsulation } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';
import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoryComponent {

  breadcrumbs : string = "";
  acf         : any      = {};

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage('nuestra-historia').subscribe(post => {
      this.acf = post.fields 
    });
  }

  configPrinciples: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      prevEl: '.principles-prev',
      nextEl: '.principles-next',
    },
    pagination: { 
      el: '.principles-pagination',
      clickable: true 
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
      },
      780: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      }
    }
  };

  configAwards: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      780: {
        slidesPerView: 2,
        spaceBetween: 21,
        direction: "vertical",
      },
    }
  };

}
