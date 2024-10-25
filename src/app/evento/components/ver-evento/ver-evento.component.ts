import { Component, inject } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-evento',
  standalone: true,
  imports: [RouterModule, FormsModule, NgFor, NgIf],
  templateUrl: './ver-evento.component.html',
  styleUrl: './ver-evento.component.css'
})
export class VerEventoComponent{

  eventosService= inject(EventoService);
  listaEventos: Evento [] = [];
  eventoSeleccionado: Evento | null = null;

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

  verEvento(evento: Evento) { // Método para manejar el evento de clic
    this.eventoSeleccionado = evento; // Almacena el evento seleccionado
    console.log("Evento seleccionado:", evento);
  }
}

