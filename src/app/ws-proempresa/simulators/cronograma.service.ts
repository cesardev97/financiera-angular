import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperService } from '@shared/utils/helper-service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CronogramaService {
  private proempresaURL = environment.proempresaFormsWS.URL;
  protected readonly http: HttpClient;
  
  constructor(
    tokenHandler : TokenHandler, 
    private hService : HelperService, 
    private datePipe: DatePipe) { 
      this.http = new HttpClient(tokenHandler)
    }

  generateCronograma(formData : any, wsData : any){
    const currentDate = new Date();
    const body : any = {
      "fechaCreacion": this.datePipe.transform(currentDate, 'dd/MM/yyyy'),
      "canCuoGracia": 0,
      "canDiaGracia": Number(wsData?.canDiasGracia || 0),
      "indCodIntCuoGracia": 0,
      "indCobIntDiaGracia": "",
      "tipoReembolso": "1",
      "codMoneda": formData.currency,
      "tipVenCuota": 1,
      "impAprobado":formData.amount,
      "codPdo": 4,
      "numCuotas": formData.installments,
      "impPortes": 1,
      "tasaIgv": 0,
      "numDiasTasa": "0729",
      "codPlan": formData.insurance || '',
      "indSegVar":"",
      "indTipSeg": formData.desgravamen
    }

    // Calculo Tasa de Interes
    const x = formData.tea
    const y = 1.00/12.00
    const z = 1 + x/100
    const p = Math.pow(z, y)
    const q = (p - 1)*100
    const TEM = this.hService.toDecimal(Number(q), 2)

    body.tasaInt = TEM

    if (formData.amount >= 5000) {
      body.tasaSfij = 0
      body.tasaSvar = 0.075
    }
    else {
      body.tasaSfij = 0.065
      body.tasaSvar = 0
    }

    const url = `${this.proempresaURL}/proempresa/experiencia/credito/v1.0/simulador/generar`;
    return this.http.post<any>(url, body).pipe(
      map(resp => ({
        tcea : resp.result.tcea, 
        cronograma : resp.result.cronogramaResult
      }))
    )
  }

}