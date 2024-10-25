import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recinto } from '../../../recinto/interfaces/recinto.interface';
import { Sector } from '../../../recinto/interfaces/sector.interface';
import { RecintoService } from '../../../services/recintos.service';
import { Entrada } from '../../interfaces/entrada.interface';
import { Evento } from '../../interfaces/evento.interface';
import { Fecha } from '../../interfaces/fecha.interface';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css'
})

export class AddEventoComponent implements OnInit{

  @Output()
  emitirEvento: EventEmitter<Evento> = new EventEmitter();

  recintosService= inject (RecintoService);

  listadoRecintos: Recinto[] = [];
  sectoresRecinto: Sector[]= [];

  entrada: Entrada = {
    nombreSector: '',
    precio: 0,
    disponibles: 0,
    asientos: []
  }

  fecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas: []
  }

  evento: Evento ={
    nombreEvento:'',
    artista_banda: '',
    duracion:'',
    UrlBanner:'',
    recinto_id: 1,
    fechas: [this.fecha]
  }

  ngOnInit(): void {
    this.levantarRecintos();
  }

  levantarRecintos ()
  {
    this.recintosService.getRecintos().subscribe(
      {
        next: (recintos: Recinto[])=>{
          this.listadoRecintos= recintos;
        },
        error: (err)=> {
          console.error('Error al levantar recintos:', err);
        }
      }
    )
  }

 //le pasa todos los datos al evento segun el recinto MENOS EL PRECIO
 seleccionRecinto (event: any)
 {
   const idSeleccionado = Number(event.target.value);

   this.evento.recinto_id= idSeleccionado;

   if (!idSeleccionado) return;

   let recintoEncontrado = this.listadoRecintos.find(recinto => recinto.id == idSeleccionado);

   console.log(recintoEncontrado);

   if (recintoEncontrado && recintoEncontrado.sectores)
   {
     console.log("se encontro el recinto");
     this.sectoresRecinto= recintoEncontrado.sectores;
     this.fecha.entradas = [];
     this.rellenarEntradas(this.sectoresRecinto);
   }
   else {
     console.log("no se encontro el recinto");
     this.sectoresRecinto = [];
   }

 }


 rellenarEntradas (sectores: Sector[])
 {
   for (const sector of sectores) {
     console.log(sector);
       this.entrada.nombreSector= sector.nombreSector;
       this.entrada.disponibles= sector.capacidad;

       if (sector.numerado) {
         this.entrada.asientos = sector.asientos;
       }

     //VER ACA COMO RELLENAR EN TODAS LAS FECHAS
     this.fecha.entradas.push({...this.entrada});
   }

 }

 addFecha ()
 {
   if (this.fecha.fecha && this.fecha.hora) {
     this.evento.fechas.push({...this.fecha})
     alert('Sector agregado correctamente');
   } else {
     alert('Por favor completa todos los campos del sector.');
   }
 }

  addEvento ()
  {
    let entradasCargadas : Entrada[] = [];

    //rellena todas las fechas con las mismas entradas
    for (const fecha of this.evento.fechas) {
      if(fecha.entradas.length >0)
      {
        entradasCargadas = fecha.entradas;
      }
    }

    for (const fecha of this.evento.fechas) {
      if(fecha.entradas.length === 0)
      {
        fecha.entradas = entradasCargadas;
      }
    }

    console.log(this.evento);
    this.emitirEvento.emit({...this.evento});
  }

}
