import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, //aca estoy inportando en este modulo todo los referidos a las rutas hijas de este modulo. Sino las rutas no se podrian usar.
    MaterialModule //aca estoy importando el modulo en donde tengo todo los modulos de material ya impotados (esto mismo se hace en heroes.module.ts para tener disponible todos estos modulos para el modulo heroes, aca lo hago para el modulo auth)
  ]
})
export class AuthModule { }
