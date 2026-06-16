import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperService } from '@shared/utils/helper-service';
import { TokenHandler } from '@ws-proempresa/authentication/interceptor.service';
import { map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AhorroSimulatorService {
  private proempresaURL = environment.proempresaFormsWS.URL;
  protected readonly http: HttpClient;
  
  constructor(
    tokenHandler : TokenHandler, 
    private hService : HelperService, 
    private datePipe: DatePipe) { 
      this.http = new HttpClient(tokenHandler)
    }

  sendSimulatorAhorro(req : any, result : any){
    const tipoTasa = result.modalidad == '002' ? result.tipotasamora : result.tipotasaint
    req.numPeriodicidad = result.periodicidad
    req.codModalidad = result.modalidad
    const body : any = {
      ...req,
      "tazaInteres": result.tasamensual, 
      "tipotasa": Number(tipoTasa) || 0
    }

    const url = `${this.proempresaURL}/proempresa/experiencia/ahorro/v1.0/simulador/generar`;
    return this.http.post<any>(url, body).pipe(
      map(resp => ({ result : resp.result[0]}))
    )
  }

  validateProduct(fData : any, wsData : any, isNegocios : boolean){
    
    const fechaDeposito = this.datePipe.transform(fData?.fee_date, 'dd/MM/yyyy') || ''
    const codModalidad = this.valModalidad(fData.product_slug)
    const numPeriod = this.valPeriodicity(fData.periodicity, codModalidad, 'val')
    const body : any = {
      "codEmpresa": wsData?.codEmpresa || '0001',
      "codGrupoProsis": wsData?.codGrupo || '00',
      "codProductoProsis": wsData?.codProducto || '00',
      "codTipoPersona": isNegocios ? 'PJ' : 'PN',
      "codMoneda": fData.currency,
      "numPlazo": fData.deadline_day || 0,
      "monImporte": this.hService.toDecimal(fData.amount, 2),
      "monCuotas": fData.fee_amount || 0,
      "numCuotas": fData.cant_fees || 0,
      "codModalidad": codModalidad,
      "numPeriodicidad": numPeriod,
      "fechaPrimerDeposito": fechaDeposito
    }

    const url = `${this.proempresaURL}/proempresa/experiencia/producto/v1.0/ahorro/validar`;
    return this.http.post<any>(url, body).pipe(
      map(resp => ({ result : resp.result[0], request: body}))
    )
  }


  valModalidad(text : string){
    if (/programado/.test(text)) {
      return '00'
    }
    else if(/vencimiento/.test(text)){
      return '001'
    }
    else if(/periodico/.test(text)){
      return '002'
    }
    else {
      return ''
    }
  }

  valPeriodicity(period : any, mod : string, type : string = 'sim'){
    if (mod == '001' || mod == '002') {
      return '003'
    }
    else if(mod == '00'){
      switch(Number(period)) {
        case 7:
          return '001'
        case 15:
          return '002'
        case 30:
          return '003'
        default:
          return '003'
      }
    }
    return ''
  }
}