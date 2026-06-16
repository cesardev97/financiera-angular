import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FinancieraModule } from './pages-financiera/financiera.module';
import { GobiernoModule } from './pages-gobierno/gobierno.module';
import { PagesSimpleModule } from './pages-simple/pages-simple.module';
import { TransparenciaModule } from './pages-transparencia/transparencia.module';
import { AppStoreModule } from '@store/store.module';

import { AppComponent } from './app.component';
import { RoutesInterceptor } from './ws-wordpress/_interceptor.service';
import { ProductosModule } from './productos/productos.module';
import { SimulatorModule } from './simulators/simulators.module';
import { PagesAyudaContactoModule } from './pages-ayuda-contacto/ayuda-contacto.module';
import { LayoutModule } from './_layout/layout.module';
import { PipesModule } from './pipes/pipes.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    FinancieraModule,
    TransparenciaModule,
    PagesSimpleModule,
    GobiernoModule,
    PagesAyudaContactoModule,
    AppStoreModule,
    ProductosModule,
    SimulatorModule,
    PipesModule
  ],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: RoutesInterceptor, multi: true}
  ]
})
export class AppModule { }
