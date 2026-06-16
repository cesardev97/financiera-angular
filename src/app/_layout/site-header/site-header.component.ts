import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '@app-common/modal/modal.component';
import { OptionsStoreService } from '@store/general/options.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent{
  logoImage     : string = '';
  openMenuMobile: boolean = false;

  @Input() menu!    : any[];
  @Input() options  : any = {};
  @Input() linkHome : string = "";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog,
    private optionsStore: OptionsStoreService,
  ) { }

  ngOnInit(): void {
    this.optionsStore.getLogo().subscribe(logo => this.logoImage = logo);
  }

  openSearch(): void {
    const dialogRef = this.dialog.open(SearchModalComponent);
    dialogRef.afterClosed().subscribe(() => {this.closeMenuMob()})
  }

  toggleMenuMobile() {
    this.openMenuMobile = !this.openMenuMobile;
    this.document.documentElement.classList.toggle('cdk-global-scrollblock');
  }

  closeMenuMob(){
    this.openMenuMobile = false;
    this.document.documentElement.classList.remove('cdk-global-scrollblock');
  }
}
