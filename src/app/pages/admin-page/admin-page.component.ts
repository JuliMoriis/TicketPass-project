import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FiltrarEventoComponent } from "../../evento/components/filtrar-eventos/filtrar-eventos.component";
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario/interfaces/usuario.interface';
import { ListEventoComponent } from '../../evento/components/list-evento/list-evento.component';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterModule, FiltrarEventoComponent, ListEventoComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})

export class AdminPageComponent {

  id: string | null = ''

  userService = inject(UsuarioService)
  active = inject(ActivatedRoute)

  administrador : Usuario | undefined

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log("ID obtenido de la ruta:", this.id); 
      if (this.id) {
        this.userService.getUsuariosById(this.id).subscribe({
          next: (userDB: Usuario) => {
            this.administrador = userDB;
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
