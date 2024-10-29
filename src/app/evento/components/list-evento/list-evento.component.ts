import { Component, inject, Input, OnInit } from '@angular/core';
import { AddEventoComponent } from '../add-evento/add-evento.component';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-evento',
  standalone: true,
  imports: [AddEventoComponent, RouterModule],
  templateUrl: './list-evento.component.html',
  styleUrl: './list-evento.component.css'
})
export class ListEventoComponent implements OnInit{

  @Input() userId: string | null = '';

  //getbyid

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
