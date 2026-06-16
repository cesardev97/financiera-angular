import { Component, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TabsComponent } from '@app-common/tabs/tabs.component';
import { SoatStoreService } from '@store/products/soat.service';
import { FormRequestStore } from '@store/products/form-request.service';
import { APISharedService } from '@ws-wordpress/options.service';
import { APIService } from '@ws-wordpress/api.service';

import { HelperService } from '@shared/utils/helper-service';
import { SimulatorStore } from '@store/products/simulator-store.service';
import { ProductDetailsStore } from '@store/products/product-details.store';
import { OptionsStoreService } from '@store/general/options.service';

import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
import { UtilsSimultatorService } from '@ws-proempresa/simulators/utils/utils.service';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleProductComponent {

  productID   : number = 0;
  acf         : any = {};
  opt         : any = {};
  opt2        : any = {};
  opt3        : any = {};
  productSlug : string = ""
  simulator : any = null;
  projectAmount : any = {};
  listOptions: any[] = [];

  arrayFilter: any[] = [];
  selectedTableOption : number = 1;

  module      : string = '';
  pathModule  : string = '';
  productURL  : string = "";
  formReqUrl  : string = "";

  @ViewChild(TabsComponent) tabs!: TabsComponent;

  constructor(
    private route         : ActivatedRoute,
    public dialog         : MatDialog,
    public uService       : HelperService,
    private soatStore     : SoatStoreService,
    private sharedService : APISharedService,
    private apiService    : APIService,
    private formStore     : FormRequestStore,
    private productStore  : ProductDetailsStore,
    private simulatorStore: SimulatorStore,
    private _optionsStore : OptionsStoreService,
    private utilsSimulator: UtilsSimultatorService
  ) { 
   
    this.route.queryParams.subscribe(params => {
      const paramOrigen = params['origen'];
      
      if (paramOrigen === 'proyecto') {
        this.simulatorStore.getProjectAmount().subscribe(resp => {
          if (resp)
            this.projectAmount = resp;
        })
      }
      else {
        this.projectAmount = {};
      }
    });
  }

  ngOnInit(): void {
    this.sharedService.options.subscribe(resp => this.opt = resp);
    this.sharedService.options2.subscribe(resp => this.opt2 = resp);
    this.sharedService.options3.subscribe(resp => this.opt3 = resp);
    
    this.route.params.subscribe( (params) =>{
      this.listOptions = []
      this.productSlug = params['prod'];

      this.module = this._optionsStore.getModuleValue()
      this.pathModule = this.module == 'PJ' ? '/negocios' : ''
      this.formReqUrl = `${this.pathModule}/solicitud-de-producto/${this.productSlug}`;
      
      let storedProduct = this.productStore.getProductStoreData();
      
      if (storedProduct?.slug  && storedProduct.slug == this.productSlug) {
        this.loadDataProduct(storedProduct.data)
      }
      else {
        this.apiService.getPage(this.productSlug, "producto").subscribe(post => {
          this.loadDataProduct(post)
          this.productStore.addProductStoreData({data: post, slug: this.productSlug})
        })
      }
    })
  }

  loadDataProduct(post : any){
    this.productID = post.id;
    this.productURL = this.productID === 1973 ? '/negocios/proyectos-conglomerados' : this.formReqUrl
    this.acf = post.fields;
    
    this.soatStore.addTipoSoat(this.acf.types_list);
    if (this.acf.has_simluator) {
      this.simulator = this.acf.simulator_form;
      
      this.simulator.type = this.acf.product_type
      this.simulator.product = this.acf.title_banner;
      this.simulator.productSlug = this.productSlug;
      this.simulator.formUrl = this.formReqUrl;
      this.simulator.amount = this.projectAmount;
      this.simulator.isNegocioModule = this.module == 'PJ' ? true : false;

      if (this.acf.code_ws) {
        this.utilsSimulator.getItemsProducts(this.simulator.type).subscribe(products => {
          if (products) {
            if (this.simulator.type=='saving' && this.acf.code_group_ws) {
              this.simulator.wsData = products.list.find((x:any) => x?.codProducto == this.acf.code_ws && x?.codGrupo == this.acf.code_group_ws)
            }
            else if(this.simulator.type=='credit') {
              this.simulator.wsData = products.list.find((x:any) => x?.codProducto == this.acf.code_ws)
            }
          }
        })
      }
    }

    const images = this.uService.selectFormImgs(
      this.acf.product_type,
      this.opt3.credit_images,
      this.opt3.saving_images,
      this.opt3.insurance_images,
    );
    
    if (this.acf.types_list) {
      this.listOptions = this.acf.types_list.map((x:any) => x.title);
    }
    else if(this.acf.has_table && this.acf.last_row_btns){
      if (this.acf.table_content?.header.length > 2) {
        const body = this.acf.table_content?.body;
        const lengthBody = body.length;
        const lastRow = body[lengthBody - 1].map((x:any) => x.c ).filter((y:any) => y!='');
        
        const options = this.acf.table_content.header.map((x:any) => x.c);
        this.listOptions = options.splice(options.length - lastRow.length)

        this.onSelectTable(); //For table mobile with select
      }
    }
    
    const formRequest = {
      title: this.acf.form_request_title,
      title_short: this.acf?.short_name_product || this.acf.title_banner,
      type: this.acf.product_type,
      product : this.acf.title_banner,
      urlBack : `${this.pathModule}/producto/${this.productSlug}`,
      isNegocioModule: this.module == 'PJ' ? true : false,
      options: this.listOptions,
      images: images,
    }
    this.formStore.addFormRequest(formRequest)

    //Tarifarios y documentos
    this.route.fragment.subscribe(fragment => {
      if (fragment=='documentos') {
        setTimeout(() => {
            this.tabs.setTabActive('document')
        }, 1000);
      }
    });

  }

  onSelectTable(index: number = 1){
    this.arrayFilter = this.acf.table_content?.body
      .map((x:any)=> x.filter((x:any, ind:number)=> ind === index))
  }

  carrouselConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: { 
      el: '.product-slider-pagination',
      clickable: true 
    },
    breakpoints: {
      540: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      }
    }
  };

}



