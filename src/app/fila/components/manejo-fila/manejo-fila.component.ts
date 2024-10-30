import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { Evento } from '../../../evento/interfaces/evento.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-manejo-fila',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './manejo-fila.component.html',
  styleUrl: './manejo-fila.component.css'
})
export class ManejoFilaComponent implements OnInit{

  usuario: Usuario | undefined
  evento: Evento | undefined
  fecha: string | null = ''
  active = inject (ActivatedRoute)
  userService = inject(UsuarioService)
  eventoService = inject(EventoService)

ngOnInit(): void {
  this.active.paramMap.subscribe(param => {
    const userId = param.get("userId");
    const eventoId = param.get("idEvento");
    const fechaParam = param.get("fecha");

    this.fecha = fechaParam

    this.userService.getUsuariosById(userId).subscribe({
      next: (usuarioEncontrado: Usuario) => {
        this.usuario = usuarioEncontrado;
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })

    this.eventoService.getEventosById(eventoId).subscribe({
      next: (eventoEncontrado: Evento) => {
        this.evento = eventoEncontrado;
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  })
}

}
