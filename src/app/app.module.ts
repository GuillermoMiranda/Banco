import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module'; //primero pongo los modulos

import { ErrorPageComponent } from './shared/error-page/error-page.component'; //luego de los modulos van los componentes


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, //importo el modula para hacer consultar http
    AppRoutingModule //aca le indico al app.module que ahora dispone del modulo de rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
