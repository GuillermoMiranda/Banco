import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false  //esta caracteriztica de PURE lo que hace es indicarle si este PIPE debe ejecutarse con cada control de cambios que ejecuta ANGULATR o NO. Por defecto esta en TRUE y significa que NO se ejecuta siempre porque consume mas recursos. Pero por ejemplo si quiero que se refleje un cambio de imagen de un heroe enseguida uque grabo, deberia poner PUre: FALSE, de manera que en cada ciclo que ejecuta angular se corra el PIPE y actualice la imagen. NO lo pongo porque consume muchos recuroso.
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if( !heroe.id && !heroe.alt_img){
      return 'assets/no-image.png' //aca le digo que cuando pase el pipe de la imgen, en caso que el heore no tenga ID (eso ocurre cuando lo estyo creando) que me muestre el png grisazo de no imagen
    } else if (heroe.alt_img) { //y aca pregunto que si tiene imagen la devuelva
      return heroe.alt_img
    } else {
    return `assets/heroes/${heroe.id}.jpg`;
    }
  }

}
