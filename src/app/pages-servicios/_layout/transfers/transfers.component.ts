import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HelperService } from '@shared/utils/helper-service';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransfersComponent {

  @Input() slugTransfer : string = '';

  serviceName : string = ""
  breadcrumbs : string = "";
  acf         : any = {};
  opt         : any = {};
  opt2        : any = {}

  simulator   : any = {};
  
  constructor(
    public hService    : HelperService, 
    private sharedService : APISharedService, 
    private apiService    : APIService,
  ) { }

  ngOnInit(): void {
    this.sharedService.options.subscribe(resp => this.opt = resp);
    this.sharedService.options2.subscribe(resp => this.opt2 = resp);

    this.apiService.getPage(this.slugTransfer, "servicio").subscribe(resp => {
      
      this.serviceName = resp.name
      this.acf = resp.fields;

      if (this.acf.has_simulator) {
        this.simulator = this.acf.simulator_form;
        this.simulator.product = this.acf.title_banner;
      }
    })
  }


  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.steps-pagination',
      clickable: true 
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      }
    }
  };
  


}
