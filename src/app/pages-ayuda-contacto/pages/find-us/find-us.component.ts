import { Component, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { AuthTokenService } from '@ws-proempresa/authentication/_auth.service';
import { MapService } from '@ws-proempresa/forms/utils/map.service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';
import { UbigeoService } from '@ws-proempresa/forms/utils/ubigeo.service';


@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FindUsComponent {

  formG!  : FormGroup;
  departments : any[] = []
  provinces   : any[] = []
  districts   : any[] = []

  filterGroup     : any = null
  markersFilter : any[] = []
  map : any;


  constructor(
    private formBuilder   : FormBuilder,
    public ubigeo         : UbigeoService,
    public utils          : UtilsFormService,
    private mapService    : MapService,
    private _authService  : AuthTokenService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.formG = this.formBuilder.group({
      department: [, [Validators.required]],
      province: [, [Validators.required]],
      district: [, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.ubigeo.getUbigeobyCod('DEPA').subscribe(resp => {
      this.departments = resp.result
    });

    this.ubigeo.getAgencybyCod('001').subscribe(resp => {
      if (resp.result?.length > 0) {
        this.setMarkers(resp.result)
      }
    })
  }

  onSelectDepartment(){
    this.provinces = []
    this.districts = []
    this.ubigeo.getUbigeobyCod('PROV', this.formG.value['department']).subscribe(resp => {
      this.provinces = resp.result
    });
  }

  onSelectProvince(){
    this.districts = []
    this.ubigeo.getUbigeobyCod('DIST', this.formG.value['province']).subscribe(resp => {
      this.districts = resp.result
    });
  }

  setMarkers(list : any[]){
    if (isPlatformBrowser(this.platformId)) {
      const customIcon =  this.mapService.L.icon({
        iconUrl: 'assets/images/utils/icono-agencia.svg',
        shadowUrl: 'assets/images/utils/icono-agencia.svg',
        iconSize:     [32, 40],
        iconAnchor:   [16, 20],
        popupAnchor:  [0, -25]
      })
      list.forEach(item => {
        const marker = this.mapService.L.marker([item.numCoordebadaX, item.numCoordenadaY], { 
          icon: customIcon,
          draggable: false,
          title: item.nomAgencia,
          opacity: 1
        }).bindPopup(
          `<img src="assets/images/utils/icono-agencia.svg"><div><h4>${item.nomAgencia}</h4><p>${item.desDireccion}</p><p>Celular: ${item.celular} - Teléfono: ${item.telefono}</p></div>`
        );
        this.markersFilter.push(marker);
      });
  
      this.filterGroup = this.mapService.L.layerGroup(this.markersFilter);
  
      if (!this.map) {
        const tileLayer = {'init' : this.mapService.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')};
    
        this.map = this.mapService.L.map('map', {
          center: [list[0].numCoordebadaX, list[0].numCoordenadaY],
          zoom: 25,
          layers: [tileLayer['init'], this.filterGroup]
        });
      }
      else {
        this.map.addLayer(this.filterGroup)
        this.map.panTo([list[0].numCoordebadaX, list[0].numCoordenadaY])
      }
    }
  }

  filterAgencias(f : FormGroupDirective){
    const ubigeo = this.formG.value['district']
    
    this.ubigeo.getAgencyByUbigeo(ubigeo).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Incoveniente con la busqueda, intente nuevamente')
        return throwError(() => error.error)
      })
    ).subscribe(resp => {
      if (resp.result.length > 0 && this.markersFilter) {
        this.markersFilter = []
        this.map.removeLayer(this.filterGroup);
        this.setMarkers(resp.result)
      }
      else {
        alert('No existen agencias en el distrito seleccionado.')
      }

      f.resetForm();
    })
  }

}
