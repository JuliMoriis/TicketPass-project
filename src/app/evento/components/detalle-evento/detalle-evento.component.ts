import { Usuario } from './../../../usuario/interfaces/usuario.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../interfaces/evento.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
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
      this.id = param.get('id');
      console.log("ID obtenido de la ruta:", this.id); // Verifica que `id` es correcto
      if (this.id) {
        this.eventosService.getEventosById(this.id).subscribe({
          next: (eventoSeleccionado: Evento) => {
            this.eventoSeleccionado = eventoSeleccionado;
          },
          error: (e: Error) => {
            console.log(e.message);
          }
        });
      } else {
        console.log("ID no encontrado en los parámetros de la ruta.");
      }
    });

    this.active.paramMap.subscribe(param => {
      this.userId = param.get('userId');
      console.log("ID obtenido de la ruta:", this.userId); // Verifica que `id` es correcto
      if (this.userId) {
        this.userService.getUsuariosById(this.userId).subscribe({
          next: (usuarioEncontrado: Usuario) => {
            this.usuario = usuarioEncontrado;
          },
          error: (e: Error) => {
            console.log(e.message);
          }
        });
      } else {
        console.log("ID no encontrado en los parámetros de la ruta.");
      }
    });

  }


}
