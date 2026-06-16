import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TrabajoService {
    private proempresaURL = environment.proempresaFormsWS.URL;
    protected readonly http: HttpClient;

    private readonly _profesionesSoruce = new BehaviorSubject<any>(null);
    private readonly _experienciasSoruce = new BehaviorSubject<any>(null);

    public profesiones : any[] = [];
    public experiencias: any[] = [];

    constructor(
        tokenHandler : TokenHandler,
    ) { this.http = new HttpClient(tokenHandler)}

    getProfesiones(){
        this.profesiones = this._profesionesSoruce.getValue()
        if (!this.profesiones) {
            const url = `${this.proempresaURL}/proempresa/experiencia/persona/v1.0/profesion/consultar`;
            this.http.get<any>(url).subscribe(resp => {
                this.profesiones = resp.result;
                return this._profesionesSoruce.next(this.profesiones);
            })
        }
    }

    getExperiencias(){
        this.experiencias = this._experienciasSoruce.getValue()
        if (!this.experiencias) {
            const url = `${this.proempresaURL}/proempresa/experiencia/persona/v1.0/campo-experiencia/consultar`;
            this.http.get<any>(url).subscribe(resp => {
                this.experiencias = resp.result;
                return this._experienciasSoruce.next(this.experiencias);
            })
        }
    }

    sendFormTrabajo(data : any){
        const formData = new FormData();

        const body = {
            "nombres": data.names,
            "apellidos":`${data.lastname1} ${data.lastname2}`,
            "tipoDocumento": {
               "idTipoDocumento": data.typedocument.numTipoDocumento
            },
            "numDocumento": data.document,
            "correo": data.email,
            "numTelefono": data.phone,
            "profesion": {
               "idProfesion": data.career.idProfesion
            },
            "campoExperiencia": {
               "idCampoExperiencia": data.experience.idCampoExperiencia
            }
        }

        formData.append('data', JSON.stringify(body))
        formData.append('archivo', data.filecv)

        const url = `${this.proempresaURL}/proempresa/experiencia/persona/v1.0/postulante/registrar`;
        return this.http.post<any>(url, formData)
    }

}