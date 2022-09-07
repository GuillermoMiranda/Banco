import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root' //esto lo que hace es importar o inyectar este srevicio en el root de la aplicacion, es decir que estara disponible para toda la aplicacion,
})

//como este servicio estara de manera global, voy a necesitar de manera global tambien importar un modulo que me permita trabajar con las peticiones http para consultar la BD. Esta importavcion del modulo, al tener que hacerla de manera global, la tendre que hacer en el app.module.ts EL MODULO QUE IMPORTARE AHI ES EL httpClientModule
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  //aca en el constructor debo crear el servicio
  constructor( private http: HttpClient ) { }

  //como siguiente paso se generara un metodo que hara una peticion get
  getHeroes(): Observable<Heroe[]>{ //aca le estoy indicando que el metodo devuelve un OBSERVABLE de HEROES[], que es la interface creada, por eso se pone entre <>
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`) //es importante poner el return para que me devuelva un OBSERVABLE que traera un objeto y es justamente el get a la BD. Le indico que el tipo de dato que debuelve sera con la estructura definida en la inteface HEROE
  }
  //esta info la voy a consumir en el html de LISTADO, entonces debo inyectar el servicio en esa pagina, pero los ervicios se inyectan en el TS de ese html, por eso se inyecta el servioci en el listado.component.ts

  getHeroePorID(id: string): Observable<Heroe>{ //aca le estoy indicando que el metodo recibe el ID que es un string y que devuelve un OBSERVABLE de HEROES[], que es la interface creada, por eso se pone entre <>, pero en este caso es 1 solo heroe y no un arreglo de heroes
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`) 
  }

  getSugerencias(termino:string): Observable<Heroe[]>{  //aca estoy indicando qye el metodo que hara la busqueda recibe el termino que el usuario este tipiando en el formuladio de buscar.component.html. Con ese termino devolvere lo que vaya encontrando
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`) //aca le digo que la busqueda la vaya haciendo en base al termino que se va tipiando (q) y que la cantidad de resultados que mjyuestre sea como maximo de 6 
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe)
  } //aca estoy agregando en la BD. se manda un heroe, la solicitud es POST y como segundo argumento luego de la url de la BD va el formato, que es un heroe. Asi se manda toda la informacion. Ese segundo parametro "heroe" es la data que viaja en el BODY de la peticion.

  actualizarHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
  } //aca estoy actulizando en la BD. se manda un heroe, la solicitud es PUT y como segundo argumento luego de la url de la BD va la informacion que es justamente lo que tenemos en heroe, que es un heroe. Asi se manda toda la informacion. Ese segundo parametro "heroe" es la data que viaja en el BODY de la peticion.

  borrarHeroe(id:string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  } //aca estoy borrando un hero de la BD, y solo le paso el ID como argumento. Lo que me devuelve esa funcion se pone como un observable ANY, porque no devuelve nada. , la solicitud es DELETE y no de manda  segundo argumento luego de la url de la BD dado que no necesita nada.
}
