import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-short-text',
  templateUrl: './short-text.component.html',
})
export class ShortTextComponent{

  @Input() title       : string = ""
  @Input() urlFile     : string = "";
  @Input() paragraph   : string = "";
  @Input() labelButton : string = "";
  @Input() style        : number = 1;
  @Input() type        : string = "";


  openText(): void {
    const element = document.querySelector('.short-paragraph');
    element?.classList.add('text-full');
  }

  // downloadPDf(){
  //   this.pdfService.generatePDF(this.titlePDF, this.paragraph, 'download');
  // }
}
