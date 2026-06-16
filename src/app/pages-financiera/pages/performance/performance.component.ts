import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent {
  
  breadcrumbs : string = "";
  acf         : any      = {};
  cardItems   : any[] = [];

  constructor(
    private apiService : APIService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.apiService.getPage('desempeno-social').subscribe(post => {
      this.acf = post.fields
      this.spliceCards(this.acf?.results_list)
    });
  }

  spliceCards(items: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      let slidesPerGroup = innerWidth >= 768 ? 5 : 1;
      if (items.length > 0) {
        for (let i = 0; i < items.length; i+=slidesPerGroup) {
          this.cardItems.push(items.slice(i, i + slidesPerGroup));
        }
      }
    }   
  }

  carrouselConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 40,
    pagination: {
      el: '.results-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.results-next',
      prevEl: '.results-prev'
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      860: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 40,
      }
    }
  };
}
