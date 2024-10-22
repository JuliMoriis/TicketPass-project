import { Recinto } from './../../recinto.interface';
import { Asiento } from '../../asiento.interface';
import { Component } from '@angular/core';
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

  mostrarFormSector: boolean = false;



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
    for(let i = 1; i<= this.sector.capacidad + 1 ; i++){
      let asientoSector: Asiento = {
        butaca: i,
        disponibilidad: true
      }
      this.sector.asientos.push(asientoSector);
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
      this.mostrarFormSector= false;
    } else {
      alert("Por favor completa todos los campos");
    }
  }

  mostrarFormularioSector ()
  {
    this.mostrarFormSector= true;
  }

}




