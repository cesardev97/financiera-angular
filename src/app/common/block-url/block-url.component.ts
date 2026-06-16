import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-block-url',
  templateUrl: './block-url.component.html',
  styleUrls: ['./block-url.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlockURLComponent {
  @Input() imageBlock   : string = ""
  @Input() urlBlock     : string = ""
  @Input() typeUrl      : string = "internal"
  @Input() titleBloq    : string = ""
  @Input() subtitleBlock: string = ""
  @Input() textBtnBlock : string = ""
  @Input() color        : string = ""
  
  constructor() { }
}
