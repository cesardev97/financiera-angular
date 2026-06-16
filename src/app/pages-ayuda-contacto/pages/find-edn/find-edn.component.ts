import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogFindEDN } from '@app-common/modal/modal.component';
import { HelperService } from '@shared/utils/helper-service';
import { APIService } from '@ws-wordpress/api.service';

@Component({
  selector: 'app-find-edn',
  templateUrl: './find-edn.component.html',
  styleUrls: ['./find-edn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FindEdnComponent {

  breadcrumbs : string = "";
  acf  : any = {};
  formJob!: FormGroup;

  searchResult : any = {}
  isSearching : boolean = false;
  noResult : boolean = false;

  constructor(
    private apiService: APIService, 
    public hService:HelperService, 
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.apiService.getPage("ayuda-y-contacto_encuentra-tu-edn").subscribe(resp => {
      this.acf = resp.fields;
    });

    this.formJob = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async searchEDN(f:FormGroupDirective) {
    if (this.formJob.valid) {
      this.isSearching = true;
      this.noResult = false;

      this.apiService.searchExecutive(this.formJob.value['dni']).subscribe(resp => {
        this.isSearching = false;
        if (!resp.ok) {
          this.noResult = true;
          setTimeout(() => {
            this.noResult = false;
          }, 5000);
          return;
        }

        this.searchResult = resp.data;
        this.openEDN();
        f.resetForm();
      })
    }
  }

  openEDN() {
    const dialogRef = this.dialog.open(DialogFindEDN, {
      data: {
        client: this.searchResult.client,
        products: this.searchResult.products,
        executive: this.searchResult.executive
      },
    });
  }
}

