import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: "app-cookie",
  styleUrls: ["./cookie.component.scss"],
  templateUrl: "./cookie.component.html"
})
export class CookieComponent {

  showCookieElement : boolean = false;
  @Input() text: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const isAcepted = localStorage.getItem( 'acceptCookies') ? true : false;
      this.showCookieElement = !isAcepted;
    }
  }

  setCookie(): void {
    if (isPlatformBrowser(this.platformId)) {
      let item = true;
      localStorage.setItem( 'acceptCookies', JSON.stringify(item) );
      this.showCookieElement = false;
    }      
  }

  deleteCookie(): void {
    localStorage.removeItem('acceptCookies');
    this.showCookieElement = false;
  }

 }
