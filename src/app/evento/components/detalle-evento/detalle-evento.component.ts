import { Usuario } from './../../../usuario/interfaces/usuario.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../interfaces/evento.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent implements OnInit{

  eventosService= inject(EventoService);
  userService= inject(UsuarioService);

  eventoSeleccionado: Evento | undefined;
  usuario: Usuario | undefined;

  id: string | null = ''
  userId: string | null = ''

  active = inject(ActivatedRoute)

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      const id = param.get('id');
      const userId = param.get('userId');

      if (id) {
        this.eventosService.getEventosById(id).subscribe({
          next: (eventoSeleccionado: Evento) => {
            this.eventoSeleccionado = eventoSeleccionado;
          },
          error: (e: Error) => {
            console.log("Error obteniendo el evento:", e.message);
          }
        });
      } else {
        console.log("ID de evento no encontrado en los parámetros de la ruta.");
      }

      if (userId) {
        this.userService.getUsuariosById(userId).subscribe({
          next: (usuarioEncontrado: Usuario) => {
            this.usuario = usuarioEncontrado;
          },
          error: (e: Error) => {
            console.log("Error obteniendo el usuario:", e.message);
          }
        });
      } else {
        console.log("ID de usuario no encontrado en los parámetros de la ruta.");
      }
    });
  }

}
