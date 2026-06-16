import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InmuebleStoreService } from '@store/personas/inmueble.service';
import { BienProjectService } from '@ws-wordpress/bien-project.service';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent {

  @Input() hasBtn   : boolean = false;
  @Input() noImage  : string = "";
  @Input() labelBtn : string = "";
  @Output() foundInmbs = new EventEmitter<boolean>(); 

  categories : any[] = [];
  select1 : string = "";
  select2 : string = "";
  select3 : string = "";
  select4 : string = "";

  privinceFiltered : any[] = [];
  districtFiltered : any[] = [];

  isSearching: boolean = false;

  constructor(
    private inmueblesStore: InmuebleStoreService,
    private bpService: BienProjectService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.bpService.inmuebleCategories.subscribe(resp => {
      this.categories = this.bpService.orderCategories(resp);
    });
  }

  childrenOne() {
    this.privinceFiltered = [];
    this.districtFiltered = [];
    this.select3 = "";
    this.select4 = "";
    this.privinceFiltered = this.bpService.getChildren(this.categories[1].children, this.select2);
  }

  childrenTwo() {
    this.select4 = "";
    this.districtFiltered = [];
    this.districtFiltered = this.bpService.getChildren(this.privinceFiltered, this.select3);
  }

  filterInmuebles() {
    this.isSearching = true;
    this.foundInmbs.emit(false);

    let filterArray = [this.select1, this.select2, this.select3,this.select4]
    
    this.bpService.getFilterInmuebles(filterArray)
      .subscribe(inmuebles => {
        this.isSearching = false;
        
        if (inmuebles.length == 0) {
          this.foundInmbs.emit(true);
          setTimeout(() => {
            this.foundInmbs.emit(false);
          }, 5000);
          return;
        }

        let objectList = {
          noImage: this.noImage,
          labelBtn: this.labelBtn,
          inmuebles: inmuebles
        };

        this.inmueblesStore.addInmuebles(objectList);
        this.router.navigate(['/servicio/venta-de-bienes/search']);
      });
  }

}
