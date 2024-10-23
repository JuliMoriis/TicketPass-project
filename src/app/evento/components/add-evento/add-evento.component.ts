import { Component, inject, OnInit } from '@angular/core';
import { Entrada } from '../../entrada.interface';
import { Fecha } from '../../fecha.interface';
import { Evento } from '../../evento.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { RecintoService } from '../../../services/recintos.service';
import { Recinto } from '../../../recinto/recinto.interface';
import { NgFor } from '@angular/common';

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







}
