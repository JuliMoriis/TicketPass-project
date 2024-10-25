import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { Direccion } from '../../../recinto/interfaces/direccion.interface';

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {

  direccion : Direccion =
  {
    calle: '',
    numero: 0,
    ciudad: '',
    codigoPostal: '',
    pais: ''
  }

  usuario : Usuario = {
    nombre: '',
    apellido:'',
    telefono: 0,
    email:'',
    direccion: this.direccion
  }
  




}
