import { Component, Input } from '@angular/core';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-page-state',
  templateUrl: './page-state.component.html',
  styleUrls: ['./page-state.component.scss']
})
export class PageStateComponent {

  acf: any = {};
  @Input() pageSlug: string = ""

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPage(this.pageSlug).subscribe(resp => {
      this.acf = resp.fields
    });
  }

}
