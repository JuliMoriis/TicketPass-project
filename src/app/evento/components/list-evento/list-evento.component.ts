import { Component, inject, Input, OnInit } from '@angular/core';
import { AddEventoComponent } from '../add-evento/add-evento.component';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-evento',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-evento.component.html',
  styleUrl: './list-evento.component.css'
})

//compartida con cliente y admin, con visual principal
export class ListEventoComponent implements OnInit{

  @Input() userId: string | null = '';

  eventosService= inject(EventoService);
  listaEventos: Evento [] = [];

  ngOnInit(): void {
     this.listarEventos();
  }

  listarEventos()
  {
    this.eventosService.getEventos().subscribe(
      {
        next: (eventos: Evento[])=>{
          this.listaEventos= eventos;
        },
        error: (err)=> {
          console.error('Error al levantar eventos:', err);
        }
      }
    )
  }

}
