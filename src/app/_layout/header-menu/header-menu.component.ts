import { Component, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderMenuComponent  {
  @Input() menu!:any[]
  @Input() device   : string = "";
  @Output() onCloseMenuMob = new EventEmitter<boolean>();

  @ViewChildren(MatExpansionPanel) viewPanels!: QueryList<MatExpansionPanel>;
  constructor(
    private router: Router
  ) { }

  goRoute(url: string = "", type: string = 'valid'){
    if (type === 'custom' || type === 'categoria') {
      return false;
    }


    if (this.device === "mobile") {
      this.onCloseMenuMob.emit();
      this.viewPanels.forEach(p => p.close());
    }
    else {
      this.hideSubmenu();
    }

    return this.router.navigate([url])
  }


  hideSubmenu(){
    const firstMenu = document.querySelector('.h_fisrt_menu__item.open-submenu');
    firstMenu?.classList.remove('open-submenu');
  }

  hideMenuMob() {
    this.viewPanels.forEach(p => p.close());
    this.onCloseMenuMob.emit();
  }
}
