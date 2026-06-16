import { Component, Input, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { APISharedService } from '@ws-wordpress/options.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  
  @Input() title    : string = '';
  @Input() opt      : any = {}
  @Input() opt2     : any = {}
  @Input() listTabs : any[] = []
  
  tabActive: number = 0;

  @ViewChild('tabsgroup', {static: false}) tabsgroup: any;
  
  constructor(private sharedService: APISharedService) {
    this.sharedService.options.subscribe(resp => this.opt = resp);
    this.sharedService.options2.subscribe(resp => this.opt2 = resp);
  }

  setTabActive(type: string){
    setTimeout(() => {
      const tabRef = this.tabsgroup._tabs["_results"].find((t:MatTab) => t.ariaLabel === type);
      this.tabActive = tabRef.position;
    });
  }
}
