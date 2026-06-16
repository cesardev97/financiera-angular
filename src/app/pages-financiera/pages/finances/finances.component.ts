import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { HelperService } from '@shared/utils/helper-service';
import { APIService } from '@ws-wordpress/api.service';
import { VideoComponent } from '@app-common/video/video.component';

import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FinancesComponent {

  breadcrumbs: string[] = [];
  acf: any = {};
  numVideos: number = 0

  @ViewChild(VideoComponent) video!:VideoComponent;
  
  constructor(
    public hService : HelperService,
    private apiService: APIService
  ) { }

  ngOnInit(): void {
    this.apiService.getPage('finanzas-para-ti').subscribe(post => {
      this.acf = post.fields;

      this.numVideos = post.fields.list_videos.length;
    });
  }

  openVideo(url: string){
    this.video.openVideo(url);
  }

  configLearn: SwiperOptions = {
    slidesPerView: 1.15,
    spaceBetween: 24,
    navigation: {
      nextEl: '.lear-next',
      prevEl: '.lear-prev',
    },
    pagination: { 
      el: '.learn-pagination',
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
