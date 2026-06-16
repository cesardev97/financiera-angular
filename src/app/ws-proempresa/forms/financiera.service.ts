import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperService } from '@shared/utils/helper-service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';


@Injectable({ providedIn: 'root' })
export class FinancieraService {
    private proempresaURL = environment.proempresaFormsWS.URL;
    protected readonly http: HttpClient;


    constructor(
        tokenHandler : TokenHandler,
        private hService: HelperService
    ) { this.http = new HttpClient(tokenHandler)}

    sendFormFinanciera(data : any){
        const body = {      
            "desOrigen": "SOLUCIONES-FINANCIERAS",
            "nomProducto": "Reprogramacion de deudas",
            "tipoDocumento": data.type_document.desDocumento,
            "numeroDocumento": data.document_number,
            "nombres": data.names,
            "apellidos": `${data.lastname1} ${data.lastname2}`,
            "correo": data.email,
            "telefono": data.phone_number,
            "operacion": {
                "idOperacion": data.product.idOperacion,
                "desOperacion": data.product.descripcion
            }
        }

        const url = `${this.proempresaURL}/proempresa/experiencia/servicio/v1.0/reprogramar-deuda/registrar`;
        return this.http.post<any>(url, body)
    }

}