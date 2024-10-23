import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RecintoService } from '../../../services/recintos.service'; // Asegúrate de que la ruta sea correcta
import { Recinto } from './../../recinto.interface';
import { Asiento } from '../../asiento.interface';
import { Sector } from '../../sector.interface';
import { Direccion } from '../../direccion.interface';

@Component({
  selector: 'app-add-recinto',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf], // Asegúrate de que esté aquí
  templateUrl: './add-recinto.component.html',
  styleUrls: ['./add-recinto.component.css'] // Asegúrate de que sea 'styleUrls'
})

export class AddRecintoComponent {

  recintoService = inject(RecintoService);

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
       this.sector.asientos= [];

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

    this.recintoService.postRecintos(this.recinto).subscribe(
      {
        next: ()=> {
          console.log('recinto agregado');
        },
        error: (err)=> {
          alert('Error al agregar el recinto: ' + err.message);
          console.error('Error:', err);
        }
      }
    )
  }


  crearButacas(sector: Sector) {
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






