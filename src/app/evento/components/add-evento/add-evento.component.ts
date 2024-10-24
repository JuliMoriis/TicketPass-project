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

  entrada: Entrada = {
    sector_id: 1,
    precio: 0,
    disponibles: 0,
    asientos: []
  }

  fecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas : [this.entrada]
  }

  evento: Evento ={
    nombreEvento:'',
    artista_banda: '',
    duracion:'',
    UrlBanner:'',
    recinto_id: 1,
    fecha : [this.fecha]
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

  //Le pasa todos los datos al evento segun el recinto MENOS EL PRECIO
  seleccionRecinto (event: any)
  {
    this.evento.recinto_id= Number(event.target.value);
    const recintoEncontrado = this.listadoRecintos.find(recinto => recinto.id ===this.evento.recinto_id);
    console.log(recintoEncontrado);
    if (recintoEncontrado && recintoEncontrado.sectores)
    {
      console.log("se ecnontro");
      this.sectoresRecinto= recintoEncontrado.sectores;

      this.rellenarEntradas(this.sectoresRecinto);

    }
    else {
      console.log("no se encontro");
      this.sectoresRecinto = [];
    }

  }

  rellenarEntradas (sectores: Sector[])
  {
    for (const sector of sectores) {
      //crea una entrada por sector
      let entradaNueva: Entrada = {
        sector_id: 1,
        precio: 0,
        disponibles: 0,
        asientos: []
      }

      if (sector.id) {
        entradaNueva.sector_id= sector.id;
        entradaNueva.disponibles= sector.capacidad;

        if (sector.numerado) {
          entradaNueva.asientos = sector.asientos;
        }
      }
      //carga las mismas entradas en todas las fechas
      for (let fecha of this.evento.fecha) {
        const entrada = fecha.entradas.find(entrada => entrada.sector_id === sector.id);
        if (!entrada) {
          fecha.entradas.push(entradaNueva);
        }
      }
    }
  }

  buscarNombreSector(idSector: number): string {
    console.log(this.evento);
    const sector = this.sectoresRecinto.find(sector => sector.id === Number(idSector));
    if (sector)
    {
      const nombreSector: string = sector?.nombreSector;
      return nombreSector;
    }
    else
    {
      return "Sector no encontrado"
    }
  }

  addFecha ()
  {
    this.evento.fecha.push({...this.fecha});
  }

  addEvento ()
  {
    //aca va el emit
  }

}
