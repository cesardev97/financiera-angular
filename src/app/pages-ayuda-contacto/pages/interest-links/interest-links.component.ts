import { Component } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-interest-links',
  templateUrl: './interest-links.component.html',
  styleUrls: ['./interest-links.component.scss']
})
export class InterestLinksComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  
  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage("ayuda-y-contacto_enlaces-de-tu-interes").subscribe(resp => {
      this.acf = resp.fields;
    });
  }
}
