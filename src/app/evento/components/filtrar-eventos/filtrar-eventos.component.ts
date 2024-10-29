import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { Recinto } from '../../../recinto/interfaces/recinto.interface';
import { RecintoService } from '../../../services/recintos.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-filtrar-eventos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './filtrar-eventos.component.html',
  styleUrl: './filtrar-eventos.component.css'
})

export class FiltrarEventoComponent implements OnInit {
  @Input() eventos: Evento[] = [];
  resultados: Evento[] = [];
  busqueda: string = '';
  recintos: Recinto[] = [];

  constructor(
    private eventoService: EventoService,
    private recintoService: RecintoService
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerRecintos();
  }

  obtenerEventos(): void {
    this.eventoService.getEventos().subscribe((eventos) => {
      this.eventos = eventos;
      this.resultados = eventos;
    });
  }

  obtenerRecintos(): void {
    this.recintoService.getRecintos().subscribe((recintos) => {
    this.recintos = recintos;
    });
  }

  filtrarEventos(): void {
    let busq = this.busqueda.toLowerCase();
    let recintoEncontrado: Recinto | undefined;
    recintoEncontrado= this.recintos.find((recinto) =>
      recinto.nombreRecinto.toLowerCase().includes(busq));

    this.resultados = this.eventos.filter((evento) => {
      return (
        evento.nombreEvento.toLowerCase().includes(busq) ||
        evento.artista_banda.toLowerCase().includes(busq) ||
        ((recintoEncontrado) && evento.recinto_id == recintoEncontrado.id)
      );

    });

    console.log(this.resultados);
  }


}
