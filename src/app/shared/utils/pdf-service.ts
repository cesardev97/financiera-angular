import { Injectable } from '@angular/core';
import { OptionsStoreService } from '@store/general/options.service';
import * as pdfMake from "pdfmake/build/pdfmake.min";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");

@Injectable({
  providedIn: 'root',
})

export class PDFService {

  constructor(private optionsStore: OptionsStoreService) {}

  generatePDF(title: string, content: any, action: string = 'open'){
    let logo = "";
    this.optionsStore.getLogo().subscribe(resp => logo = resp);
    
    let html = htmlToPdfmake(`
        <div>
            <img height="55px" width="210px" src="${ logo }" />
            <h1 style="text-align: center;">${ title }</h1>
            <p>
            ${ content }
            </p>
        </div>
    `, 
    { 
        imagesByReference: true, 
        defaultStyles:{
            li: {
                marginBottom: 15
            }
        } 
    });

    const pdfDefinition = {
        content:html.content,
        images:html.images,
    };

    if(action==='download'){    
        pdfMake.createPdf(pdfDefinition).download(`${title}.pdf`);    
      }else if(action === 'print'){    
        pdfMake.createPdf(pdfDefinition).print();          
      }else{    
        pdfMake.createPdf(pdfDefinition).open();          
      } 
  }
}