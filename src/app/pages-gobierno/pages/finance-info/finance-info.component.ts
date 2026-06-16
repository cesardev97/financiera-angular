import { Component } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-finance-info',
  templateUrl: './finance-info.component.html',
  styleUrls: ['./finance-info.component.scss']
})
export class FinanceInfoComponent {

  breadcrumbs: string[] = [];
  acf: any = {};

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage('informacion-financiera').subscribe(post => {
      this.acf = post.fields
    });
  }

}
