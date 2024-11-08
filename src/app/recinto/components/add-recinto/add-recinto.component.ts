import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RecintoService } from '../../../services/recintos.service'; // Asegúrate de que la ruta sea correcta
import { Recinto } from '../../interfaces/recinto.interface';
import { Asiento } from '../../interfaces/asiento.interface';
import { Sector } from '../../interfaces/sector.interface';
import { Direccion } from '../../interfaces/direccion.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recinto',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de que esté aquí
  templateUrl: './add-recinto.component.html',
  styleUrls: ['./add-recinto.component.css'] // Asegúrate de que sea 'styleUrls'
})

export class AddRecintoComponent implements OnInit{

  constructor(private router: Router){}

  recintoService = inject(RecintoService);

  @Input()
  recintoRecibido?: Recinto

  ngOnInit(): void {
    if (this.recintoRecibido){
      this.recinto= this.recintoRecibido
    }
  }

  @Output()
  emitirRecinto: EventEmitter<Recinto> = new EventEmitter();

  sectoresTemp : Sector[] = []

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
    sectores: []
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

      this.sectoresTemp.push(this.sector);

      this.sector = {
        nombreSector: '',
        capacidad: 0,
        numerado: false,
        asientos: []
      };
    } else {
      alert('Por favor completa todos los campos del sector.');
    }
  }

  eliminarSector(pos: number){
    this.sectoresTemp.slice(pos, 1);
  }

  eliminarSectorEdit(pos: number){
    this.recinto.sectores.slice(pos, 1);
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


  addRecinto() {
    if (!this.recinto.nombreRecinto || !this.recinto.direccion.calle ||
      !this.recinto.direccion.ciudad || !this.recinto.direccion.codigoPostal ||
      !this.recinto.direccion.pais || !this.recinto.urlImg) {
      alert('Por favor, completa todos los campos del recinto.');
      return;
    }

    this.recinto.sectores = this.sectoresTemp;

    for (let sector of this.recinto.sectores) {
      if (!sector.nombreSector || sector.capacidad <= 0) {
        alert('Por favor, completa al menos un sector.');
        return;
      }
      else
      {
        //faltan validaciones
        this.crearButacas(sector);
      }
    }

    //FALTAN VALIDAICONES !!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(this.recinto);
    if (this.recintoRecibido){
      this.editRecinto()
      alert('Recinto editado con exito')
    }
    else
    {
      this.postRecinto()
      alert('Recinto agregado con exito')
    }

  }

  postRecinto ()
  {
    this.recintoService.postRecintos(this.recinto).subscribe(
      {
        next: ()=> {
          console.log('recinto agregado');
          this.router.navigate(['list-eventos'])
        },
        error: (err)=> {
          alert('Error al agregar el recinto: ' + err.message);
          console.error('Error:', err);
        }
      }
    )
  }

  editRecinto ()
  {
    if(this.recinto.id)
    this.recintoService.putRecinto(this.recinto.id, this.recinto).subscribe(
      {
        next: ()=> {
          console.log('recinto editado');
          this.router.navigate(['list-eventos'])
        },
        error: (err)=> {
          alert('Error al agregar el recinto: ' + err.message);
          console.error('Error:', err);
        }
      }
    )

  }


}






