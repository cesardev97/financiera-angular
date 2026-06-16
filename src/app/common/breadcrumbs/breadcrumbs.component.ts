import { Component, Input } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  @Input() breadcrumbs: string  = "";
  breadcrumbsArray : string[] = [];

  constructor() { }

  ngOnChanges(): void {
    if (this.breadcrumbs) {
      this.breadcrumbsArray = this.breadcrumbs.split("/");
    }
  }
}
