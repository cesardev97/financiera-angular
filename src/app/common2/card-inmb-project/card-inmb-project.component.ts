import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InmbProjectStoreService } from '@store/general/inmbproject.service';
import { BienProjectService } from '@ws-wordpress/bien-project.service';
import { HelperService } from '../../shared/utils/helper-service';

@Component({
  selector: 'app-card-inmb-project',
  templateUrl: './card-inmb-project.component.html'
})
export class CardInmbComponent{

  @Input() post : any = {};
  @Input() type : string = 'INMB';
  @Input() noImage  : string = "";
  @Input() labelBtn : string = "";
  
  isSearching: boolean = false;

  constructor(
    private router: Router,
    private bpService: BienProjectService,
    private inmbProjectStore: InmbProjectStoreService,
    public hService : HelperService
  ) { }

  searchInmbProject(){
    this.isSearching = true;
    
    this.bpService.getBienByID(this.post.id, this.type).subscribe(resp => {
      const path = this.type == 'INMB' ? '/servicio/venta-de-bienes' : '/negocios/proyectos-conglomerados';
      this.inmbProjectStore.addInmbProject(resp);
      this.router.navigate([path, this.post.id])
    })
  }
}
