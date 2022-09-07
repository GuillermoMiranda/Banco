import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
}) 


export class ListadoComponent implements OnInit {

  heroes:Heroe[] = [];
  //aca debo inyectar el servicio que buscar los heroes en la base de datos

  constructor( private heroeService: HeroesService ) { }

  ngOnInit(): void {

    //en el onint voya  llamar ese servicio, o en realidad llamo al metodo getHeroes que esta en ese servicio. Debo subscribirme pra que el servicio se ejecute

    this.heroeService.getHeroes()
      .subscribe( heroes => {
        this.heroes = heroes; //aca le digo que el this.heroes que cree mas arriba de tipo Heroe[] sera igual a lo que reciba como argumento "heroes" en la funcion flecha
      }
        ) //al suscribir le digo que me muestre en consola la respuesta que reciba
  }

}
