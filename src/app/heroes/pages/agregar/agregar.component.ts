import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px
  }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    { id: "DC Comics",
      desc: "DC - Comics"
    },{
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img:''
  }
  constructor( private heroeService: HeroesService,
               private rutaActiva: ActivatedRoute,
               private router: Router, //el router lo uso para que cuando termino de cargar los datos de un nuevo heore me lleve a la hoja de los datos del heroe en la BD.
               private snackBar: MatSnackBar, //el snackBar es el que se utiliza para que aparezcan las notificaciones, por ejemplo en este caso cuando se edita un heroe, que me aparezca cuando se edita algo, haciendo que se ejcute un metod que ejecuta ese snackbar.
               private dialog: MatDialog ) { } //este servicio es el que muestra los cuadros de dialogos cuando quiero pedir la confi4rmacion de si esta seguro que quiere borrar un heroe. Este servicio se llama en el metodo de borrarHeroe

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) { //en este IF pregunto que se la url en la que estoy NO incluye la palabra "editar" (quiere decir que lelgue porque estoy creadno uno nuevo) direectaemnte no hace nada al entrar, pero SI SI incluye la paraabra editar, quiere decir que el heroe ya existye y es corecto que con el ID pida la info del mismo para que se escriba en la pantalla de manera automatica al ingresa a la pagibna.
      return;
    } 
    
    this.rutaActiva.params.pipe(
      switchMap( ({id}) => this.heroeService.getHeroePorID(id))) //este observable devuelve un Heroe, por eso en el suscribe tengo un heroe, que lo igual al heroe que tengo en los campos del formulario.
      .subscribe( heroe => this.heroe = heroe)
    
  }

  guardar(){
   if (this.heroe.superhero.trim().length === 0) {
     return
   }

   if (this.heroe.id) { //si el heroe ya tiene un ID significa que estoy actualizando
      //actualiza
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe( heroe => this.mostrarSnackBar('Resgistro Actualizado'))
   } else { //si el heroe aun no tiene un ID significa que estoy creando uno nuevo
    //Crea
      this.heroeService.agregarHeroe(this.heroe)
      .subscribe( heroe => { //aca luego de crear me lleva a la ruta de los datos del heroe
        this.router.navigate(['heroes/editar', heroe.id]);
        this.mostrarSnackBar('Resgistro Creado');
      })
   }
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent, { //aca estoy usando el servicio de Dialog, de manera que al presionar BORRAR me aparezca un pedido de confirmacion. El primer argumentro del servicio es un COMPONENTE que tuve que crear que contiene todo el HTML que aparecera en el dialogo, el segundo comenponente son las configuraciones, por ejempli el tamanio de la ventanda del mensaje que aparecera, y en data la info que quiero pasar a ese componente hijo de dialogo, para que me aparezca alguna info especifica en esa ventana (puedo apsar cuaklquier tiipo de informacion)
      width: '250px',
      data: {...this.heroe} //cuando lo mando asi e sporque le paso algo que lo estoy desvinculando de la referencia para que nadie de manera maliciosa me quierea modificar el heroe, porque eso uso el operador spred para desvincular y que paso la data como un nete independiente. Aca le estoy mandando la info a confirmar.component.ts. POr eso en ese componente debo recibirlo con el @inject (ver esn ese componente) en el cosntructor de ese componente, se lo debe importar tambien (clase #215)
    })
    
    //hasta aca el lo correspondieten al dialog, ahora vere como ejecutar o NO lel metodo de borrar el heroe en base a que boton se presiona
    dialog.afterClosed().subscribe( //aca le digo que luego de cerrado el dialog, en base a que venga en result (este el el true o undefind que se indico en cada metodo de cada boton como this.dialogRef.close(true) o this.dialogRef.close(), si es TRUE es porque aprete SI,BORRAR y por eso ejecuta el metodo de borrar, sino no hace nada porque solo presione CANCELAR
      (result) => {
        if (result){
          this.heroeService.borrarHeroe(this.heroe.id!) //aca llamo el metdo que borrar el heroe, pasandole el ID. Le tengo que poner el ! porque TS me dice que puede venir el nulo, pero le aseguro que no es asi poniendo el !
          .subscribe(resp => { //como siempre tengo que poner el susbribe, que me traer[a una respuesta que sera vacio, y lo que hago es redireccionar al usario a la plantealla deheroes.
            this.router.navigate(['/heroes']);
      
          })
        }
      }
    )

   
  }

  mostrarSnackBar(mensaje: string){ //al metodo le voy a pasar un mensaje que sera el que mostrara cada vez que aparezca o llame al metodo.
    this.snackBar.open(mensaje, 'ok!', { //cuando llamo el snackBar le paso el mensaje que recibe el emtodo, el mensajito del boton que aprieta o aparece en la notificacion (ese seria el ok!) y el tercer parametro es la configuracion, que es un elemento, en el que le paso la duracion de 2500 milisegundos para que se cierre el snackBar
       duration: 2500
    })
    //este metodo mostrarSnackBar lo llamare en cada lugar donde quiera que aparezca la notificacion, pasando el mesanje que corresponda en cada caso.
  }
}
