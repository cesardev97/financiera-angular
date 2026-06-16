import { Component, ViewEncapsulation } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  
  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage("ayuda-y-contacto_preguntas-frecuentes").subscribe(resp => {
      this.acf = resp.fields;
      
    });
  }
}
