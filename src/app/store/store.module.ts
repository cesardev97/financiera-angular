import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ]
})
export class AppStoreModule { }
