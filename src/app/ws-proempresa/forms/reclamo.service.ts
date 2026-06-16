import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';


@Injectable({ providedIn: 'root' })
export class ReclamoService {
    private proempresaURL = environment.proempresaFormsWS.URL;
    protected readonly http: HttpClient;

    private readonly _tiposSource = new BehaviorSubject<any>(null);
    private readonly _motivosSource = new BehaviorSubject<any>(null);

    public motivos  : any[] = [];

    constructor(
        tokenHandler : TokenHandler,
    ) { this.http = new HttpClient(tokenHandler)}

    getTiposReclamo():Observable<any>{
        const tipos = this._tiposSource.getValue()
        if (!tipos) {
            const url = `${this.proempresaURL}/proempresa/experiencia/reclamo/v1.0/tipo/consultar`;
            this.http.get<any>(url).subscribe(resp => {
                return this._tiposSource.next(resp.result);
            })
        }

        return this._tiposSource.asObservable();
    }

    getMotivosReclamo(){
        this.motivos = this._motivosSource.getValue()
        if (!this.motivos) {
            const url = `${this.proempresaURL}/proempresa/experiencia/reclamo/v1.0/motivo/consultar`;
            this.http.get<any>(url).subscribe(resp => {
                this.motivos = resp.result;
                return this._motivosSource.next(this.motivos);
            })
        }
    }

    sendFormReclamo(data : any){
        const formData = new FormData();
        const body = {
            'codInterno': '0001',
            'agencia':{
                'idAgencia': data.agency.idAgencia,
                'desAgencia': data.agency.desAgencia
            },
            'isCliente': data.is_client,
            'nomCliente': data.names,
            'apePaterno': data.lastname1,
            'apeMaterno': data.lastname2,
            'isMenorEdad': data.is_minor,
            'desApoderado': data.is_minor = 1 ? data.representative : '',
            'tipoDocumento': {
                'idTipoDocumento': data.document_type.numTipoDocumento,
                'tipoDocumento': data.document_type.desDocumento
            },
            'numDocumento': data.document_number,
            'telefono': data.phone_number,
            'celular': data.cellphone,
            'email': data.email,
            'departamento': data.department.nomDepartamento,
            'provincia': data.province.nomProvincia,
            'distrito': data.district.nomDistrito,
            'direccion': data.address,
            'referencia': data.reference,
            'indEnvioRespuesta': data.channel_response,
            'tipoReclamo': {
                'idTipoReclamo': data.complaint_type.idTipoReclamo,
                'desReclamo': data.complaint_type.desReclamo
            },
            'motivo': {
                'idMotivo': data.reason.idMotivo,
                'desMotivo': data.reason.desMotivo
            },
            'operacion': {
                'idOperacion': data.product.idOperacion,
                'desOperacion': data.product.descripcion
            },
            'descripcion': data.description
        }

        formData.append('data', JSON.stringify(body))

        if (data.documents?.length) {
            for (let i = 0; i < data.documents?.length; i++) {
                formData.append('archivos', data.documents[i])
            }
        }

        const url = `${this.proempresaURL}/proempresa/experiencia/reclamo/v1.0/registrar`;
        return this.http.post<any>(url, formData)
    }

}