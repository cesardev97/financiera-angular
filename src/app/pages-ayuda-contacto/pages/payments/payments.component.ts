import { Component, ViewEncapsulation } from '@angular/core';
import { HelperService } from '@shared/utils/helper-service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  
  showAgents  : boolean = false;
  isShowTable : boolean = false;

  constructor(
    public hService: HelperService,
    private apiService: APIService
  ) { }
  
  ngOnInit(): void {
    this.apiService.getPage("ayuda-y-contacto_canales-de-pago").subscribe(resp => {
      this.acf = resp.fields;
    });
  }

  expandAgents(element: any){
    this.showAgents = true;
    setTimeout(() => {
      this.hService.goLink(element); 
    }, 100);
  }

  showHideTable(){
    this.isShowTable = !this.isShowTable;
  }

  paymentsSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.payments-pagination',
      clickable: true
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      900: {
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
