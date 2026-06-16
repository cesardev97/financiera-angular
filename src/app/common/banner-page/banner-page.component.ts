import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-banner-page',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerPageComponent {
  @Input() bannerFields: any = {};
  @Input() internalUrl : string = "";
  @Input() fragmentURL : string = '';

  constructor() {}

}
