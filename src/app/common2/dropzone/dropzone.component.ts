import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {

  @Output() outFiles = new EventEmitter<File[]>();
  @Input() multiple : boolean = false;
  @Input() acceptFiles : string[] = ['application/pdf','.doc','.docx'];

  files: File[] = [];

  allowedSize: number = 3000000; //KB
  isToBig : boolean = false;

  constructor() { }

  onSelect(event:any) {
    if([...event.rejectedFiles].length > 0){
      if ([...event.rejectedFiles][0].size > this.allowedSize) {
        this.isToBig = true;
      }
    }

    if (!this.acceptFiles.find(x => [...event.addedFiles][0].type)) {
      return;
    }

    this.files = [];
    this.files.push(...event.addedFiles);
    this.outFiles.emit([...event.addedFiles]);
    this.isToBig = false;
  }

  onRemove(event:any) {
    this.files = [];
    this.files.splice(this.files.indexOf(event), 1);
    this.outFiles.emit(this.files);
  }
}
