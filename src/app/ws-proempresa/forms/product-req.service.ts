import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs';
import { HelperService } from '@shared/utils/helper-service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';


@Injectable({ providedIn: 'root' })
export class ProductRequestService {
    private proempresaURL = environment.proempresaFormsWS.URL;
    protected readonly http: HttpClient;


    constructor(
        tokenHandler : TokenHandler,
        private hService: HelperService
    ) { this.http = new HttpClient(tokenHandler)}

    sendProductRequest(data : any, options : any){
        const modulo = options.isNegocios ? 'NEGOCIOS' : 'PERSONAS'
        const typeProduct = this.hService.translateProductType(options.type);
        const tranlatedType = `${typeProduct.toUpperCase()}S`;

        const body : any = {      
            "desOrigen": `${tranlatedType}-${modulo}`,
            "nomProducto": options.product,    
            "nombres": data.names,
            "apellidos": `${data.lastname1} ${data.lastname2}`,
            "correo": data.email,
            "telefono": data.phone_number,
            "nomDepartamento": data.department.nomDepartamento,
            "nomProvincia": data.province.nomProvincia,
            "nomDistrito": data.district.nomDistrito
        }

        if (options.isNegocios) {
            // RUC and Razon Social
            body.tipoDocumento = 'REGISTRO ÚNICO DE CONTRIBUYENTES (RUC)'
            body.numeroDocumento = data.business_ruc
        }
        else {
            body.tipoDocumento = data.document_type.desDocumento
            body.numeroDocumento = data.document_number
        }

        //Seguros
        if (data.option) {
            body.s_Digital = null
            body.tipo_Plan = null
            data.option?.value.includes('SOAT') ? body.s_Digital = data.option.id : body.tipo_Plan = data.option.id
        }

        let url : string;
        if (typeProduct == 'seguro') {
            url = `${this.proempresaURL}/proempresa/experiencia/servicio/v1.0/seguro/solicitud/registrar`;
        }
        else {
            url = `${this.proempresaURL}/proempresa/experiencia/${typeProduct}/v1.0/solicitud/registrar`;
        }
        return this.http.post<any>(url, body).pipe(
            catchError(this.hService.handleError)
        )
    }

}