import { Component, inject, Input } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Evento } from '../../interfaces/evento.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';

@Component({
  selector: 'app-list-eventos-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-eventos-admin.component.html',
  styleUrl: './list-eventos-admin.component.css'
})
export class ListEventosAdminComponent {

  userId: string | null = ''

  userService = inject(UsuarioService)
  active = inject(ActivatedRoute)

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      this.userId = param.get('id');
    })

    this.listarEventos();
  }

  eventosService= inject(EventoService);
  listaEventos: Evento [] = [];

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

  cambioAlta (evento: Evento){
    evento.alta = evento.alta === 1 ? 0 : 1;

    this.eventosService.putEvento(evento.id, evento).subscribe({
      next :()=> {
        console.log('evento actualizado');
      },
      error: (e: Error )=> {
        console.log(e.message);
      }
    })

  }



}
