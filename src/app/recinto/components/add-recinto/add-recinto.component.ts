import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  imports: [FormsModule, CommonModule],
  templateUrl: './add-recinto.component.html',
  styleUrls: ['./add-recinto.component.css']
})

export class AddRecintoComponent implements OnInit {

  constructor(private router: Router) { }

  recintoService = inject(RecintoService);

  @Input()
  recintoRecibido?: Recinto

  ngOnInit(): void {
    if (this.recintoRecibido) {
      this.recinto = this.recintoRecibido
    }
  }

  @Output()
  emitirRecinto: EventEmitter<Recinto> = new EventEmitter();

  sectoresTemp: Sector[] = []

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
    capacidadTotal: 0,
    sectores: [],
    alta: 1
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

  agregarSectorEdit() {
      this.recintoRecibido?.sectores.push(this.sector);

      this.sector = {
        nombreSector: '',
        capacidad: 0,
        numerado: false,
        asientos: []
      };

  }

  eliminarSector(pos: number) {
    this.sectoresTemp.slice(pos, 1);
  }

  eliminarSectorEdit(pos: number) {
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
    else {
      sector.asientos = [];
    }
  }

  capacidadTotalCalculo(): number {
    const capacidadTotal = this.recinto.sectores.reduce((acumulador, sector) => acumulador + sector.capacidad, 0);
    return capacidadTotal;
  }

  addRecinto(formulario: NgForm) {

    if (formulario.invalid) return;

    if (this.recintoRecibido)
    {
      this.editRecinto()
      alert('Recinto editado con exito')
    }


    else
    {
      for (let sector of this.recinto.sectores) {
        console.log('entor al for');
        if (!sector.nombreSector || sector.capacidad <= 0) {
          alert('Por favor, completa al menos un sector.');
          return;
        }

            this.crearButacas(sector);
            this.recinto.capacidadTotal = this.capacidadTotalCalculo()
            this.postRecinto()
            alert('Recinto agregado con exito')
      }
    }

  }

  postRecinto() {
    this.recintoService.postRecintos(this.recinto).subscribe(
      {
        next: () => {
          console.log('recinto agregado');
          alert('Recinto agregado con exito!')
          this.router.navigate(['recintos'])
        },
        error: (err) => {
          alert('Error al agregar el recinto: ' + err.message);
          console.error('Error:', err);
        }
      }
    )
  }

  editRecinto() {
    if (this.recinto.id)
      this.recintoService.putRecinto(this.recinto.id, this.recinto).subscribe(
        {
          next: () => {
            console.log('recinto editado');
            alert('Recinto editado con exito!')
            this.router.navigate(['recintos'])
          },
          error: (err) => {
            alert('Error al agregar el recinto: ' + err.message);
            console.error('Error:', err);
          }
        }
      )

  }


}






