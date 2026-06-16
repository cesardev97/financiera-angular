import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-request-two',
  templateUrl: './form-two.component.html',
})
export class FormThreeComponent  {

  @Input() requestForm : any = {};
  @Output() emailOutput = new EventEmitter<string>();
  @Output() responseOutput = new EventEmitter<any>();

  constructor() { }
  
  emailSent(value: string) {
    this.emailOutput.emit(value);
  }

  responseSent(value : any){
    this.responseOutput.emit(value)
  }
}
