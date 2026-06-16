import { Component, Input, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteFooterComponent {

  @Input() options: any = {};
  @Input() menu!: any[];
  @ViewChildren(MatExpansionPanel) viewPanels!: QueryList<MatExpansionPanel>;

  constructor() { }

  closePanelItems(){
    this.viewPanels.forEach(p => p.close());
  }

}
