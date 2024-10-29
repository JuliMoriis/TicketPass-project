import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListEventoComponent } from '../../evento/components/list-evento/list-evento.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario/interfaces/usuario.interface';

@Component({
  selector: 'app-cliente-page',
  standalone: true,
  imports: [RouterLink, ListEventoComponent],
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.css'
})
export class ClientePageComponent implements OnInit{

  id: string | null = ''

  userService = inject(UsuarioService)
  active = inject(ActivatedRoute)

  usuario : Usuario | undefined

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log("ID obtenido de la ruta:", this.id); // Verifica que `id` es correcto
      if (this.id) {
        this.userService.getUsuariosById(this.id).subscribe({
          next: (userDB: Usuario) => {
            this.usuario = userDB;
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


