import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation, PLATFORM_ID } from '@angular/core';

import { OptionsStoreService } from '@store/general/options.service';
import { APISharedService } from '@ws-wordpress/options.service';

@Component({
  selector: 'app-simple-layout',
  templateUrl: './simple-layout.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SimpleLayoutComponent {

  @Input() titlePage: string = "";
  @Input() linkHome : string = "";
  @Input() hasBanner: boolean = false;
  @Input() urlBack  : string | null = null;
  @Input() showMenuMob : boolean =  false;

  logoImage   : string = ""
  imageBanner : string = "";
  hideHeader  : boolean = false;

  constructor(
    private optionsService : APISharedService,
    private _optionStore: OptionsStoreService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      if (innerWidth > 900) {
        this.document.body.classList.add('hide-header', 'hide-footer');
      }
      else if (this.showMenuMob) {
        this.document.body.classList.remove('hide-header');
        this.hideHeader = true;
      }
      else {
        this.document.body.classList.add('hide-header');
      }
    }
 
    this.optionsService.options2.subscribe(resp => this.imageBanner = resp.request_form_banner);
    this._optionStore.getLogo().subscribe(logo => this.logoImage = logo);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('hide-header', 'hide-footer');
  }

}
