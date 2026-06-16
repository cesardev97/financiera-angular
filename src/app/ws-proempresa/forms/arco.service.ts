import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, BehaviorSubject } from 'rxjs';
import { HelperService } from '@shared/utils/helper-service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { AuthTokenService } from '@ws-proempresa/authentication/_auth.service';


@Injectable({ providedIn: 'root' })
export class ArcoService {
    private proempresaURL = environment.proempresaFormsWS.URL;
    protected readonly http: HttpClient;

    private readonly _bancoDatosSource = new BehaviorSubject<any>(null);

    public bancoDatos : any[] = []

    constructor(
        tokenHandler : TokenHandler,
        private hService: HelperService,
        private _authToken : AuthTokenService
    ) { this.http = new HttpClient(tokenHandler)}

    getBancoDatos(){
        this.bancoDatos = this._bancoDatosSource.getValue()
        if (!this.bancoDatos) {
            const url = `${this.proempresaURL}/proempresa/experiencia/persona/v1.0/consultar`;
            this.http.get<any>(url).subscribe(resp => {
                this.bancoDatos = resp.result;
                return this._bancoDatosSource.next(this.bancoDatos);
            })
        }
    }

    sendFormDerechoArco(data : any){
        const formData = new FormData();
        const body : any = {      
            "nomCliente": data.names,
            "apePaterno": data.lastname1,
            "apeMaterno": data.lastname2,
            "tipoDocumento": {
                "idTipoDocumento": data.document_type.numTipoDocumento,
                "desDocumento": data.document_type.desDocumento
            },
            "numDocumento": data.document_number,
            "desEmail": data.email, 
            "desDomicilio": data.address,
            "indRepreLegal": data.legal_representative,
            "indPeticion": data.request_type,
            "bancoDatos": {
               "idBancoDatos": data.bank_data.idBancoDatos,
               "desBancoDatos": data.bank_data.desBancoDatos
            },
            "desDerechoArco": data.description
        }

        if (data.legal_representative == 'S') {
            body.representante = {
                "nomCliente": data.repr_names,
                "apePaterno": data.repr_lastname1,
                "apeMaterno": data.repr_lastname2,
                "tipoDocumento": {
                    "idTipoDocumento": data.repr_documentType.numTipoDocumento,
                    "desDocumento": data.repr_documentType.desDocumento
                },
                "numDocumento": data.repr_documentNumber,
                "derechoArco": {}
            }
        }

        formData.append('data', JSON.stringify(body))
        formData.append('archivo1', data.documents)
        formData.append('ind_dni', 'DNI_ARCO')
        formData.append('archivo2', data.repr_documents)
        formData.append('ind_dni_repre', 'DNI_LEGAL')
        formData.append('archivo3', data.repr_document2)
        formData.append('ind_archi_repre', 'FILE_LEGAL')
        formData.append('archivo4', data.additional_files)
        formData.append('ind_archi', 'FILE_ARCO')

        const url = `${this.proempresaURL}/proempresa/experiencia/persona/v1.0/derecho-arco/registrar`;
        return this.http.post<any>(url, formData).pipe(
            map(response => response),
            catchError(this.hService.handleError)
        )
    }

}