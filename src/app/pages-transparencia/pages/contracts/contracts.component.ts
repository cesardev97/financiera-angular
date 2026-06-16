import { Component } from '@angular/core';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent {

  acf : any = {};
  opt : any = {};

  constructor(
    private apiService : APIService,
    private sharedService: APISharedService
  ) { }

  ngOnInit(): void {
    const slug = "transparencia_tasas-tarifas-y-contratos"
    this.apiService.getPage(slug).subscribe(resp => {
      this.acf = resp.fields;
    });
  
    this.sharedService.options.subscribe(resp => this.opt = resp);
  }
}
