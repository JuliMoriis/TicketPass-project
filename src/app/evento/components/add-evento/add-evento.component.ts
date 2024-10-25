import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recinto } from '../../../recinto/interfaces/recinto.interface';
import { Sector } from '../../../recinto/interfaces/sector.interface';
import { RecintoService } from '../../../services/recintos.service';
import { Entrada } from '../../interfaces/entrada.interface';
import { Evento } from '../../interfaces/evento.interface';
import { Fecha } from '../../interfaces/fecha.interface';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css'
})

export class AddEventoComponent implements OnInit{

  recintosService= inject (RecintoService);

  listadoRecintos: Recinto[] = [];
  sectoresRecinto: Sector[]= [];

  fecha: Fecha = {
    fecha: new Date(),
    hora: '',
  }

  entrada: Entrada = {
    sector_id: 1,
    precio: 0,
    disponibles: 0,
    fechas: [this.fecha],
    asientos: []
  }

  evento: Evento ={
    nombreEvento:'',
    artista_banda: '',
    duracion:'',
    UrlBanner:'',
    recinto_id: 1,
    entradas: []
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

    let recintoEncontrado = this.listadoRecintos.find(recinto => recinto.id == idSeleccionado);

    console.log(recintoEncontrado);

    if (recintoEncontrado && recintoEncontrado.sectores)
    {
      console.log("se ecnontro");
      this.sectoresRecinto= recintoEncontrado.sectores;
      this.rellenarEntradas(this.sectoresRecinto);
      console.log(this.evento.entradas);
    }
    else {
      console.log("no se encontro");
      this.sectoresRecinto = [];
    }

  }

  rellenarEntradas (sectores: Sector[])
  {
    for (const sector of sectores) {
      console.log(sector);
      if (sector.id) {
        this.entrada.sector_id= sector.id;
        this.entrada.disponibles= sector.capacidad;

        if (sector.numerado) {
          this.entrada.asientos = sector.asientos;
        }
      }

      this.evento.entradas.push({...this.entrada});
    }
  }

  buscarNombreSector(idSector: number): string {

    console.log("entro a func ");

    const sector = this.sectoresRecinto.find(sector => sector.id == idSector);
    if (sector)
    {
      console.log("holaaa");
      const nombreSector: string = sector.nombreSector;
      return nombreSector;
    }
    else
    {
      return "Sector no encontrado"
    }
  }

  addFecha ()
  {
    if (this.fecha.fecha && this.fecha.hora) {
      for (let entrada of this.evento.entradas) {
        entrada.fechas.push({...this.fecha})
      }
      alert('Sector agregado correctamente');
    } else {
      alert('Por favor completa todos los campos del sector.');
    }
  }

  addEvento ()
  {
    //aca va el emit
  }

}
