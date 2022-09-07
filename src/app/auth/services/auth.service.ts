import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, of, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth:Auth | undefined //aca voy a guardar la info de quien esta logueado, y le pongo que puede ser undefined xq si no hay nadie logueado esto si puede ser undefined.

  //este _auth es un variable privada, por eso para obtenerlo y guardarlo voy a generar un getter y luego desestructurar para guarda la info
  get auth(): Auth{ //le digo que el getter obtendra un dato de tipo auth (usuario logueado) y en el return le digo que siempre va a tener un valor
    return {...this._auth!}
  }
  //como todo esto es un servicio que es provisto en el root, es decir en toda la aplicacion puedo inyectarlo donde lo necesite y usarlo. de esa manera lo voy a inyectar para usarlo en el home.html para "pescar" el usuario activo y mostrarlo en la pantalla.

  private baseUrl:string = environment.baseUrl; //traigo de las variables de enteorno lo correspondiente al url de la BD

  constructor( private http:HttpClient) { } //aca inyecto el http porque para validar el usuario voy a hacer una peticion http para validadr que ese usuario este en la base de datos

  //voy a crear un metodo que verifque si el usuario no esta logueado aun, esto ahora lo hago con el LocalStroge, y cuando se haga el logout se limpia el local storage

   verificaAutenticacion(): Observable<boolean>  {

      if (!localStorage.getItem('token')) {
        return of(false) //aca uso el comando OF de RXJS que basicamente convierte en observable el parametro que le estemos pasando, y como estoy diciendo que NO HAY UN TOKEN debodevolver false porque el usuario no debe poder entrar si no hay un token
      }

      //aca veo que si existe el token debo verificar ue coincida con el de la base de datos, por eso hago un get y luego paso la respuesta que es de tipo Auth por el PIPE MAP para transformar eso en un booleano que es la respuesta que esta esperando el metodo verificaAutenticacion
      return this.http.get<Auth>( `${this.baseUrl}/usuarios/1`) //esto me devuelve un auth, por eso lo paso por el pipe map que lo transforma en el true porque estaria autenticado porque existe el token y no entro en el if anterior.
        .pipe(
          map( auth => { //en este punto tengo en auth toda la info del usuario enotnces la voy a asignar a _auth para guardar ahi la info del usuario y que se siga imprimiendo en el html el nombre del usuario logueado (clase 226)
            this._auth = auth
            return true
          })
        )
    }

  login(){
    return this.http.get<Auth>( `${this.baseUrl}/usuarios/1`) //busco en la bd con una peticion GET el usuario, y voy a obtener datos de tipo Auth, que coinciden con la interface definida en auth.interfaces.ts que es donde le defino que es lo que voy a obtener de ese get.
    //para poder hacer persistente esta informacion y dejar grabadocual es el usarioa que esta logueado, y dado que no podemos hacer el subscripe porque eso lo hacemos en el componente que llama a este servicio, lo que hago es usar el pipe
      .pipe( //este pipe se ejecuta antes del suscribe, y lo pasa por el tap que recibe la respuesta del get que vienen del backend
        tap( auth => this._auth = auth), //del backend recibo la info del auth (info del usuario que se loguea) y esto lo guardo en la variable _auth
        tap(auth => localStorage.setItem('token', auth.id)) //con este segundo tap lo que hago es guardar en el locaStorage el TOKEN que es igual al ID del usuario que se loguea, para mantenerlo 
        )

  }

  logout(){
    return this._auth = undefined //el logout lo que hace es purgar el _auth para que me saque lo que esta en memoria . Lo pongo undefined porque al definirlo mas arriba puse que podia ser de tipo Auth (usuario logueado) o undefined  
  }

}
