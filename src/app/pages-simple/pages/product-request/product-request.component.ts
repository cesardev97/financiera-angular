import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OptionsStoreService } from '@store/general/options.service';
import { FormRequestStore } from '@store/products/form-request.service';
import { APIService } from '@ws-wordpress/api.service';
import { ProductDetailsStore } from '@store/products/product-details.store';
import { HelperService } from '@shared/utils/helper-service';
import { APISharedService } from '@ws-wordpress/options.service';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
})
export class ProductRequestComponent {

  productSlug : string = ""
  requestForm : any = {};
  emailInput  : string = "";
  
  opt3        : any = {};
  module      : string = '';
  respData    : any = {}

  constructor(
    private router        : Router, 
    private sharedService : APISharedService,
    private apiService    : APIService,
    private productStore  : ProductDetailsStore,
    private route         : ActivatedRoute,
    private formInfoStore : FormRequestStore,
    private _optionsStore : OptionsStoreService,
    private uService      : HelperService
  ) { 
    this.route.params.subscribe( (params) =>{
      this.productSlug = params['prod'];
    })
  }

  ngOnInit(): void {
    this.module = this._optionsStore.getModuleValue();
    const formData = this.formInfoStore.getFormRequest();
    if (formData) {
      this.requestForm = formData;
    }
    else {
      this.sharedService.options3.subscribe(resp => this.opt3 = resp);
        this.apiService.getPage(this.productSlug, "producto").subscribe(post => {
          this.productStore.addProductStoreData({data: post, slug: this.productSlug})
          const pathModule = this.module == 'PJ' ? '/negocios' : ''
          const acf = post.fields;
          let listOptions = [];
          const images = this.uService.selectFormImgs(
            acf.product_type,
            this.opt3.credit_images,
            this.opt3.saving_images,
            this.opt3.insurance_images,
          );

          if (acf.types_list) {
            listOptions = acf.types_list.map((x:any) => x.title);
          }
          this.requestForm = {
            title: acf.form_request_title,
            title_short: acf?.short_name_product || acf.title_banner,
            type: acf.product_type,
            product : acf.title_banner,
            urlBack : `${pathModule}/producto/${this.productSlug}`,
            isNegocioModule: this.module == 'PJ' ? true : false,
            options: listOptions,
            images: images,
          }
        })
    }  
  }

  emailSent(value: string) {
    this.emailInput = value;
  }
  responseForm(value: any){
    this.respData = value
  }
}
