import { Component } from '@angular/core';

import { APIService } from '@ws-wordpress/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberModalComponent } from '@app-common/modal/modal.component';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
  
  breadcrumbs: string[] = [];
  acf: any = {};

  constructor(private apiService: APIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getPage('nuestro-directorio').subscribe(post => {
      this.acf = post.fields
    });
  }
  
  openDialog(title:string, name:string, image:string, 
            description:string, posit1:string, posit2:string): void {
    const dialogRef = this.dialog.open(MemberModalComponent, {
      data: {title: title, name: name, image: image, 
        description: description, posit1: posit1, posit2: posit2, 
        labelClose: this.acf.button_return
      },
    });
  }

  configSlider(pagination:string, navNext:string, naxPrev:string){
    return {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: `.${navNext}`,
        prevEl: `.${naxPrev}`,
      },
      pagination: { 
        el: `.${pagination}`,
        clickable: true 
      },
      breakpoints: {
        540: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        780: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        }
      }
    }
  }

  configLeaders: SwiperOptions = this.configSlider('dir-pagination','dir-next','dir-prev');
  configCommittee1: SwiperOptions = this.configSlider('comm-pagination-1','comm-next-1','comm-prev-1');
  configCommittee2: SwiperOptions = this.configSlider('comm-pagination-2','comm-next-2','comm-prev-2');
  configCommittee3: SwiperOptions = this.configSlider('comm-pagination-3','comm-next-3','comm-prev-3');
  configCommittee4: SwiperOptions = this.configSlider('comm-pagination-4','comm-next-4','comm-prev-4');
  configCommittee5: SwiperOptions = this.configSlider('comm-pagination-5','comm-next-5','comm-prev-5');

}
