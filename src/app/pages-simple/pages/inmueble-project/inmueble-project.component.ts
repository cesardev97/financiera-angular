import { Component, Input, OnInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { GalleryModalComponent, SuccessSendDialog } from '@app-common/modal/modal.component';
import { HelperService } from '@shared/utils/helper-service';
import { InmbProjectStoreService } from '@store/general/inmbproject.service';
import { SimulatorStore } from '@store/products/simulator-store.service';
import { BienProjectService } from '@ws-wordpress/bien-project.service';

import { ProServiciosService } from '@ws-proempresa/forms/servicios.service';
import { UtilsFormService } from '@ws-proempresa/forms/utils/utils.service';

import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-inmueble-project',
  templateUrl: './inmueble-project.component.html',
  styleUrls: ['./inmueble-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InmuebleProjectComponent {

  @Input() obj: any = {};
  
  headFields : any = {}
  type : string = 'INMB';

  FormG!      : FormGroup;
  isSending   : boolean = false;
  respStatus: string = "";

  galleryItems    : any[] = [];
  originalGallery : string[] = [];
  iterableGallery : number = 5;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router : Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public hService : HelperService,
    private bpService : BienProjectService,
    private inmbProjectStore: InmbProjectStoreService,
    private simulatorStore: SimulatorStore,
    public utils : UtilsFormService,
    private servicios : ProServiciosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data['type']) {
        this.type = data['type']
        
        if (this.type == 'INMB') {
          this.headFields.titlePage   = "Venta de bienes"
          this.headFields.breadcrumbs = "Personas / Servicios / Venta de bienes";
        }
        else {
          this.headFields.titlePage   = 'Crédito Pro Conglomerado';
          this.headFields.breadcrumbs = "Listado de proyetos / Detalle del proyecto";
        }

        this.activatedRoute.params.subscribe( (params) =>{
          const stored = this.inmbProjectStore.getInmbProject();
          if (stored) {
            this.obj = stored;
            this.spliceGallery(this.obj.fields?.gallery);
          }
          else {
            this.bpService.getBienByID(params['id'], this.type).subscribe(resp => {
              this.obj = resp;
              this.spliceGallery(this.obj.fields?.gallery);
            })
          }
        })
      }
    })


    this.FormG = this.formBuilder.group({
      product: [],
      names: ['', [Validators.required]],
      lastname1: ['', [Validators.required]],
      lastname2: ['', [Validators.required]],
      document_type: [, [Validators.required]],
      document_number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.maxLength(9)]],
      description: ['', Validators.maxLength(500)],
      recaptcha: [null, [Validators.required]],
      accept_privacy_policies: [false, Validators.requiredTrue],
      accept_privacy_policies2: [false, Validators.requiredTrue],
    });


    this.utils.getPersonDocuments();
  }

  spliceGallery(items: string[]) { 
    if (isPlatformBrowser(this.platformId)) {
      let slidesPerGroup = innerWidth >= 768 ? this.iterableGallery : 1;
      if (items.length > 0) {
        for (let i = 0; i < items.length; i+=slidesPerGroup) {
          this.galleryItems.push(items.slice(i, i + slidesPerGroup));
        }
      }
    }  
  }

  openGallery(current: number, currentMobile?: number){
    if (isPlatformBrowser(this.platformId)) {
      const activeIndex = innerWidth >= 768 ? current : currentMobile;
      this.dialog.open(GalleryModalComponent, {
        data: {gallery: this.obj.fields?.gallery, current: activeIndex},
      });
    }
  }

  sendProjectAmount() {
    const amount = {
      price: this.obj.fields.price,
      currency: this.obj.fields.currency,
    }
    this.simulatorStore.addProjectAmount(amount)
    this.router.navigate(
      ['/negocios/producto/proyectos-conglomerados'], 
      { queryParams: { origen: 'proyecto' }, fragment: 'simulador' }
    )
  }

  async send(f: FormGroupDirective) {
    this.isSending = true;
    this.respStatus = "";

    if (this.FormG.invalid) {
      this.FormG.markAllAsTouched();
      return;
    }

    const options = {
      origen: this.type == 'INMB' ? 'SERVICIOS-BIENES' : 'CONGLOMERADOS',
      nomProduct: 'VentaDeBienesAdjudicados'
    }

    this.servicios.sendFormServicios(f.value, options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.isSending = false;
        this.respStatus = 'Incoveniente al enviar datos, vuelva a intentar'
        return throwError(() => error.error)
      })
    )
    .subscribe(resp => {
      this.isSending = false;
      this.dialog.open(SuccessSendDialog, {
        data: {email: this.FormG.value['email'], type: 'product', response: resp.result},
      });
      f.resetForm();
    })
  }

  gallerySwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 40,
    preloadImages: false,
    lazy: true,
    pagination: {
      el: '.gallery-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.gallery-prev',
      nextEl: '.gallery-next',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      860: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 40,
      }
    }
  };

}
