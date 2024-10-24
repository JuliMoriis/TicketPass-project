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
    this.evento.recinto_id= event.target.value;
    const recintoEncontrado = this.listadoRecintos.find(recinto => recinto.id ===this.evento.recinto_id);
    console.log(recintoEncontrado);
    if (recintoEncontrado && recintoEncontrado.sectores)
    {
      console.log("se ecnontro");
      this.sectoresRecinto= recintoEncontrado.sectores;
    }
    else {
      console.log("no se encontro");
      this.sectoresRecinto = []; 
    }

  }








}
