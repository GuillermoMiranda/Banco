import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: '', //aca le digo que al estar en este modulo de HEROES en '' va a tener los siguietnes hijos, y para esos hijos si voy a definir rutas fijas y componentes a mostrar
    component: HomeComponent, //aca estyo definiendo cual es la ruta padre dentro de este modulo (HomeComponent) y dentro de esa ruta padre voy a tener todos los hijos definidos en children. Pero con esto siempre que este en el path 'heroes' estare viendo el HomeComponent, entonces para que me funciones las rutas hijas debo agregar en el html del HomeComponent el <router-outlet> </router-outlet> que es el que permitira que se muestren todas las rutas hijas definidas par este modulo
    children:[
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: AgregarComponent
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: ':id',
        component: HeroeComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]

  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule //debo exportarlo para que se pueda usar desde "afuera"
  ]
})
export class HeroesRoutingModule { }
