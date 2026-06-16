import { Component, ViewEncapsulation } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-national-money',
  templateUrl: './national-money.component.html',
  styleUrls: ['./national-money.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NationalMoneyComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  opt: any = {};
  opt2 : any = {}

  constructor(private sharedService: APISharedService, private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage("giros-nacionales", "servicio").subscribe(resp => {
      this.acf = resp.fields;
    });

    this.sharedService.options.subscribe(resp => this.opt = resp);

    this.sharedService.options2.subscribe(resp => this.opt2 = resp);
  }
}
