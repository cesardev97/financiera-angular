import { Component, ViewEncapsulation } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-portalsmv',
  templateUrl: './portalsmv.component.html',
  styleUrls: ['./portalsmv.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortalsmvComponent {

  breadcrumbs: string[] = [];
  acf: any = {};

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage('portal-smv').subscribe(post => {
      this.acf = post.fields
    });
  }

}
