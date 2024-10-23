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
  }

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

  crearButacas (sector:Sector) : boolean
  {
    sector.asientos= [];
    for(let i = 1; i< sector.capacidad + 1 ; i++){
     this.asiento.butaca = i;
     sector.asientos.push({...this.asiento});
    }

    if (sector.asientos.length > 0){
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
        if (this.recinto.sectores.length>=1)
        {
          this.recinto.sectores.push({ ...this.sector });
          alert("Sector agregado correctamente")

        } else {
          alert("Por favor completa todos los campos");
        }
        }

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




