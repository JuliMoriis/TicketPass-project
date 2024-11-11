import { Component, inject } from '@angular/core';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {

  listaUsuarios: Usuario[] = [];
  usuariosService = inject(UsuarioService)

  adminId: string | null = ''
  active = inject(ActivatedRoute)

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      this.adminId = param.get('adminId');
    })

    this.listarEventos();
  }

  listarEventos(): void {
    this.usuariosService.getUsuarios().subscribe(
      {
        next: (usuarios: Usuario[]) => {
          // Filtra los eventos deshabilitados (alta === 0)
          this.listaUsuarios = usuarios
        },
        error: (err) => {
          console.error('Error al levantar usuarios:', err);
        }
      }
    );
  }
}

