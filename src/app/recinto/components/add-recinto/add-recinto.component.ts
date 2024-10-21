import { Component } from '@angular/core';
import { Recinto } from '../../recinto.interface';
import { Asiento } from '../../asiento.interface';
import { Sector } from '../../sector.interface';
import { Direccion } from '../../direccion.interface';

@Component({
  selector: 'app-add-recinto',
  standalone: true,
  imports: [],
  templateUrl: './add-recinto.component.html',
  styleUrl: './add-recinto.component.css'
})
export class AddRecintoComponent {

  asiento: Asiento = {
    butaca: '',
    disponibilidad: true
  }

  sector: Sector = {
    nombre: '',
    capacidad: 0,
    numerado: false,
    asientos: []
  }

  direccion: Direccion= {
    calle: '',
    numero: 0,
    ciudad: '',
    codigoPostal: '',
    pais: ''
  }

  recinto: Recinto = {
    nombre: '',
    direccion: this.direccion,
    urlImg: '',
    sectores: [this.sector]
  }



}
