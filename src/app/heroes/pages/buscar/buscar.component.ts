import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined

  constructor( private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias( this.termino.trim() ) //este sera un metedo que estara llamando a mis servicios y de los metodos del servicio estare usando el que va mostrando las sugerencias, de acuerdo al termino de busqueda. El trim se pone para que me eleimine los espacios en blanco y si pongo un espacion no lo considera
      .subscribe( heroes => this.heroes=heroes)
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

      if (!event.option.value){ //esto lo pongo apra que si no hay valores encontrados no me dispare la busqueda y me reviente la aplicacion
        this.heroeSeleccionado = undefined; //esto lo pongo para que si hubo algun heroe seleccionado antes y se imprimir en la pantalla, en caso de buscar algo que no existe me borre todo y me deje en blanco la pantalla. Como le puse undefined a heroeSeleccionado, tengo que agregar la posibilidad de que sea undefinid al momento de definirlo
        return;
      }

      const heroe:Heroe = event.option.value
      this.termino = heroe.superhero; //con esta linea le digo que en el formulario, indique como termino lo mismo que aparece en el campo superhero del superheroe que se selecciono. Hasta ahi logro que en el formulario apareczca cual fue la seleccion realizada.
  
      //ahora que ya tengo todos los datos del heroe seleccionado debo hacer una nueva peticion http usando el ID del heroe, para traer toda la info y pegarla en la variable heroeSeleccionado que se creo para ese fin.
      this.heroesService.getHeroePorID(heroe.id!) //el ! se puso porque me saltaba un error y de esa manera le aseguro a TS que siempre va a venir el id en el heroe
        .subscribe( heroe => this.heroeSeleccionado = heroe);
    
  }

}
