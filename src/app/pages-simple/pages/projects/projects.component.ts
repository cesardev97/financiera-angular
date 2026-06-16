import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BienProjectService } from '@ws-wordpress/bien-project.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  acf     : any = {};
  projects: any[] = [];

  constructor(
    private apiService: APIService,
    private bpService: BienProjectService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) { }

  ngOnInit(): void {
    this.apiService.getPage("negocios_proyectos-conglomerados").subscribe(resp => {
      this.acf = resp.fields;
    });

    this.bpService.getProjects().subscribe(items => {
      if (items && isPlatformBrowser(this.platformId)) {
        const slidesPerGroup = window.innerWidth > 768 ? 5 : 1;
        
        for (let i = 0; i < items.length; i+=slidesPerGroup) {
          this.projects.push(items.slice(i, i + slidesPerGroup));
        }
      }
    });
  }

  onSlideChange(el: any){
    el.scrollIntoView({behavior: 'smooth'});
  }

  projectsSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    autoHeight: true,
    pagination: {
      el: '.viewed-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.viewed-next',
      prevEl: '.viewed-prev'
    },
    breakpoints: {
      768: {
        allowTouchMove: false
      }
    }
  };
  
}
