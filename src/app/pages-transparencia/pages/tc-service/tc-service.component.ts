import { Component } from '@angular/core';
import { APIService } from '../../../ws-wordpress/api.service';
import { APISharedService } from '../../../ws-wordpress/options.service';

@Component({
  selector: 'app-tc-service',
  templateUrl: './tc-service.component.html',
  styleUrls: ['./tc-service.component.scss']
})
export class TCServiceComponent {

  acf : any = {};
  opt : any = {};

  constructor(
    private apiService : APIService,
    private sharedService: APISharedService
  ) { }

  ngOnInit(): void {
    const slug = "transparencia_terminos-y-condiciones-de-anuncios"
    this.apiService.getPage(slug).subscribe(resp => {
      this.acf = resp.fields;
    });
  
    this.sharedService.options.subscribe(resp => this.opt = resp);
  }

}
