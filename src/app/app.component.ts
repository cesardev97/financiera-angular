import { Component, HostListener, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MenuStoreService } from '@store/menus/menu.service';
import { slideInAnimation } from './animations';
import { APISharedService } from './ws-wordpress/options.service';
import { OptionsStoreService } from './store/general/options.service';
import { LayoutService } from './_layout/layout.service';
import { AuthTokenService } from '@ws-proempresa/authentication/_auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'proempresa';

  activeModule : number = 1; //1:personas - 2:negocios

  isShow: boolean = false;
  topPosToStartShowing = 300;
  numWsp: string = ""

  options       : any = {};
  headerMenu    : any[] = [];
  footerMenu    : any[] = [];
  linkHome      : string = "";
  headerMenuSlug: string = "";
  footerMenuSlug: string = "footer-menu";

  trackingCode : string = '';
  urlGTMframe : string = '';

  urlObserver = new Subscription();

  constructor(
    public router         : Router,
    private route         : ActivatedRoute,
    private contexts      : ChildrenOutletContexts,
    private sharedService : APISharedService,
    private _optionsStore : OptionsStoreService,
    private layoutService : LayoutService, 
    private _menuStore    : MenuStoreService,
    private _authService  : AuthTokenService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private readonly renderer: Renderer2,
  ) {

    this.layoutService.getMenu("personas-menu").subscribe(resp => {
      this._menuStore.addPersonasMenu(resp);
    });

    this.layoutService.getMenu("negocios-menu").subscribe(resp => {
      this._menuStore.addNegociosMenu(resp);
    });

    this.urlObserver = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (/negocios/.test(event.url)) {
          this.activeModule = 2;
          this.headerMenuSlug = "negocios-menu";
          _optionsStore.addModulePage('PJ');
        }
        else {
          this.activeModule = 1;
          this.headerMenuSlug = "personas-menu";
          _optionsStore.addModulePage('PN');
        }
        this.switchMenu();
      }
    });

    //TOKEN for PROEMPRESA WS
    const tokenStorage = this._authService.geToken()
    if (!tokenStorage) {
      this._authService.generateToken().subscribe(resp => {
        if (resp) {
          this._authService.saveToken(resp.access_token);
          this._authService.saveRefreshToken(resp.refresh_token);
        }
      })
    }
  }

  
  ngOnInit(): void {
    this.sharedService.options.subscribe(resp => { 
      this.options = resp; 
      
      this._optionsStore.addLogo(resp.logo)
      this.numWsp = resp.schedule_list[1].phone

      if (isPlatformBrowser(this.platformId)) {
        if (resp?.environment == 'prod') {
          this.trackingCode = resp.tracking_id_prod;
        }
        else {
          this.trackingCode = resp.tracking_id_dev;
        }
        
        if (this.trackingCode) {
          this.urlGTMframe = `https://www.googletagmanager.com/ns.html?id=${this.trackingCode}`

          const headTag = this.document.getElementsByTagName('head')[0];
          const script = this.renderer.createElement('script') as HTMLScriptElement;
          script.src = `//www.googletagmanager.com/gtag/js?id=${this.trackingCode}`;
          script.async = true;
          this.renderer.appendChild(headTag, script);
          
          const script2 = this.renderer.createElement('script') as HTMLScriptElement;
          const scriptBody = this.renderer.createText(`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', '${this.trackingCode}');
          `);
          this.renderer.appendChild(script2, scriptBody);
          this.renderer.appendChild(headTag, script2);
        }
      }
    });   

    const menuf = this._menuStore.getMenusF();
    if (menuf.length > 0) {
      this.footerMenu = menuf
    }
    else {
      this.layoutService.getMenu(this.footerMenuSlug).subscribe(resp => {
        this.footerMenu = resp
        this._menuStore.addMenusF(resp);
      });
    }
  }

  ngOnDestroy(): void {
    this.urlObserver.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe(fragment => { 
        if (fragment) {
          setTimeout(() => {
            const element = this.document.getElementById(fragment);
              element?.scrollIntoView(true);
            }, 1500);
          }
      });
    }
  }

  toHTML(input : any) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  switchMenu(){
    if (this.headerMenuSlug === "personas-menu") {
      this._menuStore.getPersonasMenu().subscribe(resp=> this.headerMenu = resp);
    }
    else {
      this._menuStore.getNegociosMenu().subscribe(resp => this.headerMenu = resp);
    }
  }


  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  gotoTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  goWSP(){
    if (isPlatformBrowser(this.platformId)) {
      const url =`https://api.whatsapp.com/send?phone=51${this.numWsp}`;
      window.open(url, '_blank');
    }
  }

}
