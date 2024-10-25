import { Component, inject, OnInit } from '@angular/core';
import { AddEventoComponent } from '../add-evento/add-evento.component';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-list-evento',
  standalone: true,
  imports: [AddEventoComponent],
  templateUrl: './list-evento.component.html',
  styleUrl: './list-evento.component.css'
})
export class ListEventoComponent implements OnInit{

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

  addListaEvento(evento: Evento){
    this.listaEventos.push({...evento});
  }
}
