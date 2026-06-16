import { Component, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';

import { APISharedService } from '@ws-wordpress/options.service';
import { LayoutService } from 'src/app/_layout/layout.service';

import SwiperCore, { SwiperOptions, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  templateUrl: './init-modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class InitModalComponent{
  constructor(public dialogRef: MatDialogRef<InitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './paragraph.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextModalComponent {

  constructor(public dialogRef: MatDialogRef<TextModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./modal.component.scss']
})
export class VideoModalComponent {

  constructor(public dialogRef: MatDialogRef<VideoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./modal.component.scss']
})
export class GalleryModalComponent {

  constructor(public dialogRef: MatDialogRef<GalleryModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gallerySwiper: SwiperOptions = {
    slidesPerView: 1,
    initialSlide: this.data.current,
    spaceBetween: 40,
    loop: true,
    pagination: {
      // el: '.gallery-pagination',
      type: 'fraction'
    },
    navigation: {
      prevEl: '.gallery-prev',
      nextEl: '.gallery-next',
    },
  };
}

@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./modal.component.scss']
})
export class MemberModalComponent {

  constructor(public dialogRef: MatDialogRef<MemberModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./modal.component.scss']
})
export class SearchModalComponent {

  search        : string = ""
  isSearching   : boolean = false;
  showResults   : boolean = true;
  linksSugeridos: any[] = [];
  linksResult   : any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<SearchModalComponent>,
    private layoutService: LayoutService,
    private sharedService: APISharedService
  ) { }

  ngOnInit() {
    this.sharedService.options.subscribe(resp => { 
        this.linksSugeridos = resp.suggest_links;
        this.linksResult = this.linksSugeridos;
      }
    );
  }

  buscar() {
    this.searchPages()
  }

  pressKeyboard(){
    this.searchPages()
  }

  searchPages(){
    if (this.search.length < 3) {
      this.linksResult = this.linksSugeridos;
      this.showResults = true;
      return;
    }

    this.isSearching = true;

    this.layoutService.searchSuggestions(this.search)
      .pipe(debounceTime(300))
      .subscribe(        
        links => {
          this.isSearching = false;
          if (links.length == 0) {
            this.showResults = false;
            return;
          }
          
          this.showResults = true;
          this.linksResult = links.splice(0,4)
        }
      )
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './find-edn.component.html',
  styleUrls: ['./modal.component.scss']
})
export class DialogFindEDN {
  constructor(public dialogRef: MatDialogRef<DialogFindEDN>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './success-send.component.html',
  styleUrls: ['./modal.component.scss']
})
export class SuccessSendDialog {
  constructor(public dialogRef: MatDialogRef<SuccessSendDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
