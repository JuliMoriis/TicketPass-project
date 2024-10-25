import { Component } from '@angular/core';
import { AddEventoComponent } from '../add-evento/add-evento.component';
import { Evento } from '../../interfaces/evento.interface';

@Component({
  selector: 'app-list-evento',
  standalone: true,
  imports: [AddEventoComponent],
  templateUrl: './list-evento.component.html',
  styleUrl: './list-evento.component.css'
})
export class ListEventoComponent {

  listaEventos: Evento [] = [];

  addListaEvento(evento: Evento){
    this.listaEventos.push({...evento});
  }
}
