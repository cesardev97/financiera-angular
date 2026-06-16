import { Component, ViewEncapsulation } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PoliciesComponent {

  acf : any = {};
  opt : any = {};

  constructor(
    private apiService : APIService,
    private sharedService: APISharedService
  ) { }

  ngOnInit(): void {
    const slug = "transparencia_politica-de-proteccion-de-datos-personales"
    this.apiService.getPage(slug).subscribe(resp => {
      this.acf = resp.fields;
    });
  
    this.sharedService.options.subscribe(resp => this.opt = resp);
  }

}
