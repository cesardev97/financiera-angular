import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CalculosSimulator {

  constructor(private datePipe : DatePipe){}

  calculosTransferencia(amount: any, rules : any[]){
    let results = {
      commission : 0,
      swift: 0
    }
    
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index]
      const condString = rule.condition.replace('X',amount);
      if (eval(condString)) {
        const minmax = rule.commission_minmax.split('/');
        let commissionCol = eval(rule.commission.replace('X', amount).replace('%', '/100'));
        if(rule.commission.search('X') != -1 && Array.isArray(minmax)) {
          if(commissionCol <= minmax[0]) {
            commissionCol = minmax[0];
          }
          else if(minmax[1] && commissionCol >= minmax[1]){
            commissionCol = minmax[1];
          }
        }
        
        return results = {
          commission: Number(commissionCol),
          swift: Number(rule.swift) || 0
        }
      }
    }
    return results;
  }

  calculosFactoring(amount: any, fvencimiento: any, rules: any){
    const values : any = {};
    for(const key in rules){
      let formatted = rules[key]
      if (/X/.test(formatted)) {
        formatted = formatted.replace('X', amount)
      }
      if (/FIS/.test(formatted)) {
        formatted = formatted.replace('FIS', '(new Date()).getTime()')
      }
      if (/FVE/.test(formatted)) {
        formatted = formatted.replace('FVE', `(new Date("${fvencimiento}")).getTime()`)
      }
      if (key == 'dad') {
        formatted = `Math.round((${formatted})/(1000*60*60*24))`
      }
      
      for(const key2 in rules){
        if (formatted.search(key2.toUpperCase()) != -1) {
          formatted = formatted.replace(key2.toUpperCase(), values[key2])
        }
        if (/\^/.test(formatted)) {
          formatted = formatted.replace('^', '**')
        }
      }
      
      values[key] = eval(formatted)
    }
    
    return values;
  }

}