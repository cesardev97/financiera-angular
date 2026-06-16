import { Component } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-anual-memories',
  templateUrl: './anual-memories.component.html',
  styleUrls: ['./anual-memories.component.scss']
})
export class AnualMemoriesComponent {

  breadcrumbs: string[] = [];
  acf: any = {};

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage('memorias-anuales').subscribe(post => {
      let {fields} = post;
      this.acf = fields
    });
  }

  configMemories: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.memories-next',
      prevEl: '.memories-prev',
    },
    pagination: { 
      el: '.memories-pagination',
      clickable: true 
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
        spaceBetween: 24,
      }
    }
  };
}
