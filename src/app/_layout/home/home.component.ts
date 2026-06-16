import { Component, Inject, Input, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OptionsStoreService } from '@store/general/options.service';
import { InitModalComponent } from '@app-common/modal/modal.component';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import { isPlatformBrowser } from '@angular/common';
SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {

  loadInitModal : boolean = false
  acf : any = {};
  opt : any = {};

  constructor(
    private apiService: APIService,
    public router: Router,
    public dialog: MatDialog,
    private sharedService: APISharedService,
    private _optionsStore : OptionsStoreService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {  }

  ngOnInit(): void {
    const module = this._optionsStore.getModuleValue();
    let slug = 'personas_home'
    if ('PJ' == module) {
      slug = "negocios_home";
    }
    
    this.apiService.getPage(slug).subscribe(resp => {
      this.acf = resp.fields;
    });
  }

  ngAfterContentInit(): void {
    this.sharedService.options.subscribe(resp => {
      this.opt = resp
      if (resp?.campaign_image) {
        if (this._optionsStore.getIsFirstLoad() && isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.dialog.open(InitModalComponent, {
              data: {
                image: this.opt?.campaign_image, 
                typeUrl: this.opt?.campaign_type_url,
                internalURL: this.opt?.campaign_internal_url,
                externalURL: this.opt?.campaign_external_url
              }
            });
          }, 1500);
          this._optionsStore.addFirstLoad(false);
        }
      }
    });
  }

  configBanner: SwiperOptions = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1500,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.h-next',
      prevEl: '.h-prev',
    },
    pagination: { 
      el: '.h_banner_pagination',
      clickable: true 
    },
  };

  configMiddle: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.h-md-next',
      prevEl: '.h-md-prev',
    },
    pagination: { 
      el: '.h-md-pagination',
      clickable: true 
    },
    breakpoints: {

    }
  };

  configProducts: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 32,
    pagination: { 
      el: '.h-prod-pagination',
      clickable: true 
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
