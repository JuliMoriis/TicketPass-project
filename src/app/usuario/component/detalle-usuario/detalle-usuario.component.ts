import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule, EditarUsuarioComponent],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent {

  private active = inject(ActivatedRoute)
  private userService = inject(UsuarioService)

  abrirForm = false;

  usuario?: Usuario
  userId: string | null = null
  adminId: string | null = null;

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      this.adminId = param.get("adminId");
      const userId = param.get("id");

      this.userService.getUsuariosById(userId).subscribe({
        next: (usuarioEncontrado: Usuario) => {
          this.usuario = usuarioEncontrado
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      })

  })
}

mostrarEditar ()
{
  this.abrirForm= !this.abrirForm
}


}
