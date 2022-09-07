//este guard se genero con la terminal con el comando "ng g guard auth/guards/auth", y se le indico que "canActuivate " y " CanLoad" y va a usarse para definir para las rutas que si el usuario no esta autenticado no puedo verlas.
//este guard tengo que inyectarlo indicando cuales seran las rutas que va a proteger. Por eso en app-routing.module.ts (que es mi sistema de ruta). Ahi voy a indicar que yo quiero evitar que alguien pueda cargar ese modulo (en este caso el modulo heroes) si no esta autenticado. Por eso para el modulo de rutas "path: heroes" le voy a indicar una nueva propiedad que sea "canLoad" y entre corchetes le indico todos los guards que aplican para cargar ese modulo


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

//ACA VOY A INYECTAR EL SERVICIO AUTH PARA VER SI HAY ALGUIEN LOGUEADO Y EN BASE A ESO DEVOVLVER TRUE O FALSE A QUIEN LLAME A ESTE GUARD.

constructor (private authService: AuthService,
             private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { //aca el state que es de tipo StateSnapshot, significa que es el estado ACTUAL (snapshot)
      
    return this.authService.verificaAutenticacion() //aca va y verifica con el servicio que este autenticado (exsita token). Hasta este punto el verificarAutenticacion me devuelve un observable, que voy a pasar por un pipe y voy a trasnformar con el tap para transformar ese valor booleano (true o false) en una accion. Si no llega a estar autentucado lo que hago es sacar al usuario a la pantalla de login nuevamente
              .pipe(
                tap(estaAutenticado => {
                  if (!estaAutenticado){
                    this.router.navigate(['./auth/login'])
                  }
                })
              )
      /* if (this.authService.auth.id){ //si ahy un ID conectado devuevle TRUE, sino FALSE
        return true
      } 
      console.log('bloqueado por canActivate')
        return false; //si no encuentra el ID logueado directamente no permitira que se cargue el modulo en donde se llama a este guard.  } */
    }

  canLoad( //define si se puede cargar (load) un modulo (clase 224)
    route: Route,
    segments: UrlSegment[]): Observable<boolean > | Promise<boolean> | boolean { //aca estamos indicando que el canLoad puede devolver un Observable que devuelve un booleano, o una promesa que devuevle un booleano o un booleano
    
    //aca voy a preguntrar, dado que ya esta inyectado el servicio, en base a si hay algun ID conectado si mado true o flse a quien llame a este guard

    return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAutenticado => {
              if (!estaAutenticado){
              this.router.navigate(['./auth/login'])
              }
          })
        )
    /* if (this.authService.auth.id){ //si ahy un ID conectado devuevle TRUE, sino FALSE
      return true
    } 
    console.log('bloqueado por canLoad')
      return false; //si no encuentra el ID logueado directamente no permitira que se cargue el modulo en donde se llama a este guard. */
  }
}
