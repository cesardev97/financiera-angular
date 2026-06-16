import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-success-form',
  templateUrl: './success-form.component.html',
  styleUrls: ['./success-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuccessFormComponent {

  @Input() type        : string = "";
  @Input() title       : string = "Tu solicitud ha sido enviada";
  @Input() email       : string = "";
  @Input() objResponse : any = null;
  @Input() image       : string = "/assets/images/utils/success.png";
  @Input() styleClass  : string = "success-image-wrap"
  @Input() description : string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.objResponse?.mensajeLargo) {
      this.objResponse.mensajeLargo = this.objResponse?.mensajeLargo.replace(this.email, `<a>${this.email}</a>`);
    }
    
    if (!this.description) {
      switch(this.type){
        case 'product': {
          this.description = "Hola! En breves momentos nos pondremos en contacto contigo para que puedas adquirir el producto que deseas solicitar."
          break
        }
        case 'reclamo': {
          this.description = '¡Hola! En breves momentos nos pondremos en contacto contigo para resolver cualquier inconveniente.'
          break
        }
        case 'financial': {
          this.description = 'Hemos recibido tu solicitud nos comunicaremos contigo para darte una respuesa través de los medios y plazos que te hemos indicado.'
          break
        }
        case 'job': {
          this.description = 'Gracias por interés en querer formar parte de Pro Empresa, nos contacteremos contigo en el menor tiempo posible para bríndarte detalles de ofertas de trabajo que se adecuen a tu perfil'
          break
        }
        default: {
          this.description = 'Hola! En breves momentos nos pondremos en contacto contigo para absolver todas tus dudas.'
          break
        }
      }
    }
  }
}
