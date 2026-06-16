import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @Input() videoImage : string = "";
  @Input() videoUrl   : string = "";

  constructor(public dialog: MatDialog) { }

  openVideo(url: string): void {
    const dialogRef = this.dialog.open(VideoModalComponent, {
      data: {video: url},
    });
  }

}
