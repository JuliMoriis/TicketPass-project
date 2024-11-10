import { Component, inject, Input } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-list-deshabilitados-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-deshabilitados-admin.component.html',
  styleUrl: './list-deshabilitados-admin.component.css'
})
export class ListDeshabilitadosAdminComponent {

  listaEventos: Evento[] = [];
  eventosService = inject(EventoService)

  constructor(private route: ActivatedRoute) {}

  userId: string | null = ''

  userService = inject(UsuarioService)
  active = inject(ActivatedRoute)

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      this.userId = param.get('id');
    })

    this.listarEventos();
  }
  
  listarEventos(): void {
    this.eventosService.getEventos().subscribe(
      {
        next: (eventos: Evento[]) => {
          // Filtra los eventos deshabilitados (alta === 0)
          this.listaEventos = eventos.filter(evento => evento.alta === 0);
        },
        error: (err) => {
          console.error('Error al levantar eventos:', err);
        }
      }
    );
  }
}



