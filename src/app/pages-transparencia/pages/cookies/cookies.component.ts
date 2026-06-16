import { Component } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent {

  acf : any = {};
  opt : any = {};

  constructor(
    private apiService : APIService,
    private sharedService: APISharedService
  ) { }

  ngOnInit(): void {
    this.apiService.getPage("transparencia_uso-de-cookies").subscribe(resp => {
      this.acf = resp.fields;
    });
  
    this.sharedService.options.subscribe(resp => this.opt = resp);
  }
}
