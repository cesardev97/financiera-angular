import { Component } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';
import { APISharedService } from '@ws-wordpress/options.service';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent {

  acf : any = {};
  opt : any = {};

  constructor(
    private apiService : APIService,
    private sharedService: APISharedService
  ) { }

  ngOnInit(): void {
    const slug = "transparencia_directivas-de-seguridad-de-la-informacion";
    this.apiService.getPage(slug).subscribe(resp => {
      this.acf = resp.fields;
    });
  
    this.sharedService.options.subscribe(resp => this.opt = resp);
  }

}
