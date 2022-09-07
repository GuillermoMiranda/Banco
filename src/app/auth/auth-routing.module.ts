import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common'; como aca voy a definir las rutas hijas No necesito el resto de las herrameintas de angular, como ocurre al definir las rutas principales
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '', //aca le digo que al estar en este modulo de AUTH en '' va a tener los siguietnes hijos, y para esos hijos si voy a definir rutas fijas y componentes a mostrar
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]

  }
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) //aca estoy importando el RouterModule, pero ahora le pongo el forChild y no el forRoot *este solo se usa 1 unica vez en la app y es para definir las rutas pricipales como se hizo en app-routing.module.ts. Cuando las rutas con rutas hijas se usa el forChild. Y se le indican cuales son las rutas/
  ],
  exports: [
    RouterModule //debo exportarlo para que se pueda usar desde "afuera"
  ]
})
export class AuthRoutingModule { }
