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

  mostrarFormSector: boolean = false;

<<<<<<< HEAD

=======
  asiento: Asiento = {
    butaca: 0,
    disponibilidad: true
  }
>>>>>>> 99f8f18da5287edbf938639e9ae7a14bf772ea33

  sector: Sector = {
    nombreSector: '',
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
    nombreRecinto: '',
    direccion: this.direccion,
    urlImg: '',
    //urlMapaSectores: '' mapa opcional
    sectores: [this.sector]
  }

  crearButacas () : boolean
  {
    this.sector.asientos= [];
    for(let i = 1; i< this.sector.capacidad + 1 ; i++){
    console.log(this.sector.capacidad);
     this.asiento.butaca = i;
     this.sector.asientos.push({...this.asiento});
    }

    if (this.sector.asientos){
      alert('Butacas Generadas');
      return true;
    }
    else
    {
      return false;
    }
  }

  agregarSector ()
  {
    if (this.sector.nombreSector && this.sector.capacidad > 0) {
      this.recinto.sectores.push({ ...this.sector });
      alert("Sector agregado correctamente");

      this.sector = {
        nombreSector: '',
        capacidad: 0,
        numerado: false,
        asientos: []
      };

    } else {
      alert("Por favor completa todos los campos");
    }
  }

  mostrarFormularioSector ()
  {
    this.mostrarFormSector = true;
  }

  addRecinto () {

    if (!this.recinto.nombreRecinto || !this.recinto.direccion.calle ||
      !this.recinto.direccion.ciudad || !this.recinto.direccion.codigoPostal ||
      !this.recinto.direccion.pais || !this.recinto.urlImg) {
    alert('Por favor, completa todos los campos del recinto.');
    return; // Salir de la función si faltan campos
  }

  for (const sector of this.recinto.sectores) {
    if (!sector.nombreSector || sector.capacidad <= 0) {
      alert('Por favor, completa al menos un sector.');
      return;
    }
  }
      console.log(this.recinto);
      this.emitirRecinto.emit({...this.recinto}); // envio copia con spread operator.
  }

}




