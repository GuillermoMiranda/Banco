import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px
  }
    `
  ]
})
export class HeroeComponent implements OnInit {

  
  heroe!: Heroe;
 

  constructor( private rutaActiva: ActivatedRoute, 
               private  heroeService: HeroesService,
               private router:Router) { } //inyecto activatedRoute para poder leer la url del html para sacar de ahi los argumentos

  ngOnInit(): void {

      this.rutaActiva.params
        .pipe(
            switchMap(({id}) => this.heroeService.getHeroePorID(id)))
        .subscribe(heroe => this.heroe = heroe)

      //aca toma los parametros de la ruta que este activa, luego pasa eso por un PIPE y usa el SWITCHMAP para convertir el ID que saca de la url (ruta) para convertirlo en un heroe cuando lo pasa por la funcion getHerorPor Id que esta en el servicio heroeService que inyecte en el constructor.
      //Luego de esto, ya no tengo solo el ID, sino que tengo un heroe, cons eso hago el suscribe diciendole que con ese heroe que recibe lo convierta en la instancia de heroe de esta clase, que es lo que tomara el html.
    
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
