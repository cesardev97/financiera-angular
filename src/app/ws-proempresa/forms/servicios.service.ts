import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperService } from '@shared/utils/helper-service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';


@Injectable({ providedIn: 'root' })
export class ProServiciosService {
    private proempresaURL = environment.proempresaFormsWS.URL;
    protected readonly http: HttpClient;

    constructor(
        tokenHandler : TokenHandler,
        private hService: HelperService
    ) { this.http = new HttpClient(tokenHandler)}

    sendFormServicios(data : any, options: any, contribuyente : string = 'N'){
        const body : any = {
            "desOrigen": options.origen,
            "nomProducto": options.nomProduct,
            "indPersona": contribuyente,
            "nombres": data.names,
            "apellidos": `${data.lastname1} ${data.lastname2}`,
            "tipoDocumento": contribuyente == 'N' ? data.document_type?.desDocumento : 'REGISTRO ÚNICO DE CONTRIBUYENTES (RUC)',
            "numeroDocumento": contribuyente == 'N' ? data.document_number : data.ruc,
            "correo": data.email,
            "telefono": data.phone_number,
            "descripcion": data.description || ''
        }

        if (contribuyente == 'J') {
            body.cargoEmpresa = data.position_company || ''
            body.razonSocial = data.business_name || ''
        }

        const url = `${this.proempresaURL}/proempresa/experiencia/servicio/v1.0/solicitud/registrar`;
        return this.http.post<any>(url, body)
    }

}