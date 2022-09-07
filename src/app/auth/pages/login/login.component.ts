import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor( private router:Router,
               private authService: AuthService) { }

  //cuando presiono el boton "Ingresar" debo hacer varias cosas al disparars4e el siguiente metodo

  login(){
    //ir al backend (confirmar que el usuario exista, confirmar el par usuario/password). el backend nos devuelve un USUARIO. ese usuario hay que almacenarlo. Ese usuario se almacenara en un SERVICOI, para que de esa manera este disponible a lo largo de toda mi aplicacion, dado que debo saber en todo momento que usaurio esta trabajdno.

    this.authService.login()
      .subscribe( resp => {
        console.log(resp)

        if (resp.id) { //si en la respuesta ede GET viene el usuario, asi si voy a ir a la ruta
          //Una vez que tengo eso debo navegar a la oantalla HEROES, por eso usamos el router
          this.router.navigate(['./heroes'])
        }
      })    
  }

  ingresarSinLogin(){
    this.authService.logout();
    this.router.navigate(['./heroes'])
  }
}
