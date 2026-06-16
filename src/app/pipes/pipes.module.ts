import { NgModule } from '@angular/core';
import { SafePipe } from './_safe.pipe';
import { MediaPipe } from './_media.pipe';
import { SafeHtmlPipe } from './_safe-html.pipe';



@NgModule({
  declarations: [
    MediaPipe,
    SafePipe,
    SafeHtmlPipe
  ],
  exports: [
    MediaPipe,
    SafePipe,
    SafeHtmlPipe
  ],
  imports: [
  ],
  providers: [
    SafePipe,
    MediaPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule {}
