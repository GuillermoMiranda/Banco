import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';


@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef <ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroe,) { } //este servicio se inyecta porque con este lo que voy a hacer es hacer referencia al dialogo que aparecera en cada caso una vez que se precione o dispare un metodo

  ngOnInit(): void {
  }

  borrar(){
    this.dialogRef.close(true); //aca el dialogo se referencia con TRUE, idicando que sei se acepta lo que se esta consultando en el cuadro de dialogo. Luego con este true se ejecutara la accion que este asociada a esa confirmacion. 
  }

  cerrar(){
    this.dialogRef.close(); //aca llamo el servicio de dialogRef y le indico clase y nada mas, porque basicamente estara cerrrado el dialogo.
  }
}
