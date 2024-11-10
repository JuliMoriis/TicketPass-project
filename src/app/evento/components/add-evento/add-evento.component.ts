import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Recinto } from '../../../recinto/interfaces/recinto.interface';
import { Sector } from '../../../recinto/interfaces/sector.interface';
import { EventoService } from '../../../services/evento.service';
import { RecintoService } from '../../../services/recintos.service';
import { Entrada } from '../../interfaces/entrada.interface';
import { Evento } from '../../interfaces/evento.interface';
import { Fecha } from '../../interfaces/fecha.interface';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css'
})

export class AddEventoComponent implements OnInit{

  @Input()
  eventoIn?: Evento; // undefined si no pongo editar

  @Output()
  updateEvento: EventEmitter <Evento> = new EventEmitter()

  flag: boolean = false; // Controla la visibilidad del formulario
  fechaAgregada= false;

  recintosService= inject (RecintoService);
  eventosService= inject(EventoService);

  listadoRecintos: Recinto[] = [];
  sectoresRecinto: Sector[]= [];


  mostrarFormularioFecha = false;

  nuevaFecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas: [],
    disponibilidadTotal: 0,
    habilitado: 0
  };


  entrada: Entrada = {
    nombreSector: '',
    precio: 0,
    disponibles: 0,
    asientos: []
  }

  fecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas: [],
    disponibilidadTotal : 0,
    habilitado:0
  }

  evento: Evento ={
    nombreEvento:'',
    artista_banda: '',
    duracion:'',
    UrlBanner:'',
    recinto_id: 1,
    fechas: [],
    alta: 1
  }

  ngOnInit(): void {
    this.levantarRecintos();

    if (this.eventoIn) {
      this.evento = { ...this.eventoIn };
    }
  }

  levantarRecintos ()
  {
    this.recintosService.getRecintos().subscribe(
      {
        next: (recintos: Recinto[])=>{
          this.listadoRecintos = recintos.filter(recinto => recinto.alta == true)
        },
        error: (err)=> {
          console.error('Error al levantar recintos:', err);
        }
      }
    )
  }

 //le pasa todos los datos al evento segun el recinto MENOS EL PRECIO

 seleccionRecinto(event: any) {
  const idSeleccionado = Number(event.target.value);
  this.evento.recinto_id = idSeleccionado;

  if (!idSeleccionado) return;

  const recintoEncontrado = this.listadoRecintos.find(recinto => recinto.id === idSeleccionado);

  if (recintoEncontrado && recintoEncontrado.sectores) {
    console.log("Se encontró el recinto");

    this.sectoresRecinto = recintoEncontrado.sectores;

    // Encuentra la última fecha
    const ultimaFecha = this.evento.fechas[this.evento.fechas.length - 1];

    if (ultimaFecha) {
      ultimaFecha.disponibilidadTotal = recintoEncontrado.capacidadTotal;
      ultimaFecha.entradas = [];
      this.rellenarEntradas(this.sectoresRecinto, ultimaFecha);
    } else {
      console.log("No hay una fecha actual para actualizar");
    }
  } else {
    console.log("No se encontró el recinto");
    this.sectoresRecinto = [];
  }
}


rellenarEntradas(sectores: Sector[], fechaActual: any) {
  for (const sector of sectores) {
    const nuevaEntrada = {
      nombreSector: sector.nombreSector,
      disponibles: sector.capacidad,
      precio: 0,
      asientos: sector.numerado ? sector.asientos : []
    };


    fechaActual.entradas.push(nuevaEntrada);
  }
}


 aceptarFecha() {
  if (this.nuevaFecha.fecha && this.nuevaFecha.hora) {
    this.evento.fechas.push({ ...this.nuevaFecha });
    this.mostrarFormularioFecha = false;
    this.nuevaFecha = {
      fecha: new Date(),
      hora: '',
      entradas: [],
      disponibilidadTotal: 0,
      habilitado: 0
    };
    alert('Fecha agregada correctamente');

    if (this.evento.fechas.length > 0){
      this.fechaAgregada = true;

    }
  } else {
    alert('Por favor completa todos los campos de la fecha.');
  }
}

//  addFecha ()
//  {
//    if (this.fecha.fecha && this.fecha.hora) {
//      this.evento.fechas.push(this.fecha)

//      this.fechaAgregada = this.evento.fechas.length > 0;


//      this.fecha = {
//       fecha: new Date(),
//       hora: '',
//       entradas: [],
//       disponibilidadTotal : 0,
//       habilitado:0
//     }
//      alert('Fecha agregada correctamente');

//    } else {
//      alert('Por favor completa todos los campos del sector.');
//    }
//  }

  addEvento (formulario: NgForm)
  {

    if (formulario.invalid)return;

    let entradasCargadas : Entrada[] = [];
    let disponibilidad : number = 0

    //rellena todas las fechas con las mismas entradas
    for (const fecha of this.evento.fechas) {
      if(fecha.entradas.length >0)
      {
        entradasCargadas = fecha.entradas;
        disponibilidad = fecha.disponibilidadTotal;
      }
    }

    for (const fecha of this.evento.fechas) {
      if(fecha.entradas.length === 0)
      {
        fecha.entradas = entradasCargadas;
        fecha.disponibilidadTotal = disponibilidad;
      }
    }

    console.log(this.evento);
    this.guardarEventosJSON();


  }

  guardarEventosJSON ()
  {
    console.log("Evento que se enviará:", this.evento);
    this.eventosService.postEvento(this.evento).subscribe(
      {
        next: ()=> {
          console.log('evento agregado');
          alert('Evento agregado con exito')
        },
        error: (err)=> {
          alert('Error al agregar el evento: ' + err.message);
          console.error('Error:', err);
        }
      }
    )
  }

  emitUpdate(formulario: NgForm){
    if (formulario.invalid)return;
    this.updateEvento.emit(this.evento)
  }

}
