import { Recinto } from './../../recinto.interface';
import { Asiento } from '../../asiento.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { Sector } from '../../sector.interface';
import { Direccion } from '../../direccion.interface';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-recinto',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './add-recinto.component.html',
  styleUrl: './add-recinto.component.css'
})
export class AddRecintoComponent {

  @Output()
  emitirRecinto: EventEmitter<Recinto> = new EventEmitter();

  asiento: Asiento = {
    butaca: 0,
    disponibilidad: true
  };

  sector: Sector = {
    nombreSector: '',
    capacidad: 0,
    numerado: false,
    asientos: []
  };

  recinto: Recinto = {
    nombreRecinto: '',
    direccion: { calle: '', numero: 0, ciudad: '', codigoPostal: '', pais: '' },
    urlImg: '',
    sectores: [this.sector]
  };


  direccion: Direccion = {
    calle: '',
    numero: 0,
    ciudad: '',
    codigoPostal: '',
    pais: ''
  };

  agregarSector() {
    if (this.sector.nombreSector && this.sector.capacidad > 0) {
      this.recinto.sectores.push({ ...this.sector });

      // Reinicia el sector después de agregarlo
      this.sector = {
        nombreSector: '',
        capacidad: 0,
        numerado: false,
        asientos: []
      };

      alert('Sector agregado correctamente');
    } else {
      alert('Por favor completa todos los campos del sector.');
    }
  }


  addRecinto() {
    if (!this.recinto.nombreRecinto || !this.recinto.direccion.calle ||
      !this.recinto.direccion.ciudad || !this.recinto.direccion.codigoPostal ||
      !this.recinto.direccion.pais || !this.recinto.urlImg) {
      alert('Por favor, completa todos los campos del recinto.');
      return; // Salir de la función si faltan campos
    }

    for (let sector of this.recinto.sectores) {
      if (!sector.nombreSector || sector.capacidad <= 0) {
        alert('Por favor, completa al menos un sector.');
        return;
      }
      else
      {
        this.crearButacas(sector);
      }
    }

    console.log(this.recinto);
    this.emitirRecinto.emit({ ...this.recinto }); // Envio copia con spread operator.
  }


  crearButacas(sector: Sector) {
    alert('ENTOROOOOOOO');
    if (sector.numerado === true) {
      for (let i = 1; i <= sector.capacidad; i++) {
        let nuevoAsiento: Asiento = {
          butaca: i,
          disponibilidad: true // Cambia esto según tu lógica
        };
        sector.asientos.push(nuevoAsiento);
      }
    }
    else
    {
      sector.asientos= [];
    }
  }

}






