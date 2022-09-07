
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common'; AL GENARAR EL MODULO SE CREA CON ESTA IMPORTACION QUE NO LA NECESITAMOS PORQUE ACA SOLO SE DEFINIRARN RUTAS Y POR ESO NO USAREMOS COMANDS DE ANGULAR
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [ //aca estoy creando rutas, como en el app.component.ts si tengo vinculado la pagina de error puedo indicar en esta rutas cual es el componente que debe usar. Los otros modulos no estan indicados porque se usara la carga peresosa.
//aca no se cargaran explicitamente el resto de rutas, porque eso lo quiero hacer en sus respectivos modulos para usar la carga epresosa. Por esto le debo indicar que si se visita algun path en particular se carta cierto modulo, de esa manera estare vinculando los modulos individuales (auth, heroes, etc) con la app
  {
    path: 'auth', //aca le estoy indicando que cuando vaya a este path, me cargue el modulo correspondeinte, con el loadChildren
    loadChildren: ()=> import('./auth/auth.module').then(m =>(m.AuthModule)) //aca le estoy diciendo que al llegar a ese path me ejecuta esta funcion que me importa el auth.module, y como eso devuelve una promesa debo poner el .then. Cuando tengo la promesa ejecuto una funcion que recibe un modulo (m) y carga recien ahi el AuthModule
    
  },
  {
    path: 'heroes', //aca le estoy indicando que cuando vaya a este path, me cargue el modulo correspondeinte, con el loadChildren
    loadChildren: ()=> import('./heroes/heroes.module').then(m =>(m.HeroesModule)), //aca le estoy diciendo que al llegar a ese path me ejecuta esta funcion que me importa el auth.module, y como eso devuelve una promesa debo poner el .then. Cuando tengo la promesa ejecuto una funcion que recibe un modulo (m) y carga recien ahi el AuthModule
    canLoad: [AuthGuard], //aca como otra propiedad de este modulo le digo que para poderc argar este modulo (canLoad) debe usar el guard llamado AuthGuard. de esta manera cuadno se intente cargar este modulo Angular va a ir a AuthGuard y va a verificar que tengo implementado la interfaz del canlOad y va a ejecutar el metodo canLoad. ESTO HARA QUE SI EL GUARD DEVUVELVE TRUE PODRE IGRESAR Y SI DEVUELVE FALSE NO INGRESARE. EN EL GUARD ESE ESTA DEFINIDO CUADNO VERIFICA SI EXISTE ALGUN ID CONECTADO, DE SER ASI ME MANDA TRUE, SINO MANDA FALSE (clase 224)
    canActivate: [AuthGuard] //idem que con canLoad, en este caso si el modulo ya se cargo pero no se ha recargado la app, conociendo el url no van a poder ingresar porque el activate controla en tiempo real. (clase 225)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    //CommonModule TAMPOCO SE IMPORTA
    RouterModule.forRoot(routes) //debo importar esto para definir las rutas principales
  ],
  exports:[
    RouterModule //exporto para poder usarla en cualquier lugar de la aplicacion
  ]
})
export class AppRoutingModule { }
