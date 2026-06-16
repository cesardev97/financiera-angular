import { Component, ViewEncapsulation } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-remittances',
  templateUrl: './remittances.component.html',
  styleUrls: ['./remittances.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RemittancesComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  opt: any = {};
  opt2 : any = {}

  constructor(private sharedService: APISharedService, private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage("remesas", "servicio").subscribe(resp => {
      this.acf = resp.fields;
    });

    this.sharedService.options.subscribe(resp => this.opt = resp);

    this.sharedService.options2.subscribe(resp => this.opt2 = resp);
  }


  
}
