import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.authService.auth //aca hago un getter que llama al servicio de auth, y luego llamo al metodo getter que se llama auth que tengo en el servicio. Entonces ya tengo el valor del auth (usuario logueado) en el home y lo puedo llamar desde el html.
  }
  constructor( private router: Router,
               private authService: AuthService) { } //aca inyecto el authService para pescar el usuario activo e imprimirlo en el html


  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['./auth'])
  }
}
