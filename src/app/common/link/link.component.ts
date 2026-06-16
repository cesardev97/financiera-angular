import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  @Input() isContent: boolean = false;
  @Input() classUrl : string = 'btn gnrl';
  @Input() labelBtn  : string = '';
  @Input() typeUrl  : string = '';
  @Input() urls     : string[] = []; //Position 0:interno, 1:externo 2:descarga, 3:section

  constructor() { }
}
