import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card{
    margin-top: 20px 
  }`
  ]
}) //aca le digo que para mat-card de este componente especifico, porque estoy usando el STYLE de este componente, me use un margin top de 20 pixeles

export class HeroeTarjetaComponent {

  @Input() heroe!:Heroe //aca le estoy mandando a heroe-tarjeta como input el heroe, que le estyo diciendo que es de tipo Heroe, por eso importa la interface. el signo de admiracion! es porque como no lo inicializo el TS me marca un error y con eso signo yo le estyo "asegurando" que siempre va a tener un heroe y que me deje seguir.

/*   ahora con esto ya estyo para llamar desde el html que usara esta tarjeta "listado.compoenent.html este componente que estyo creando que se llama HeroeTarjetaComponent y y mandarle al mismo la info del heroe. */
}
