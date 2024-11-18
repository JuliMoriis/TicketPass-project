import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { Autenticacion } from '../../../services/autenticacion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './filtrar-usuarios.component.html',
  styleUrl: './filtrar-usuarios.component.css'
})

//barra de buscar del admin
export class FiltrarUsuariosComponent implements OnInit{

  usuarios: Usuario[] = [];
  resultados: Usuario[] = [];
  busqueda: string = '';

  adminId: string | null = ''

  mostrarResultados = false;

  private usuarioService = inject (UsuarioService)
  private autenticacion = inject (Autenticacion)

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.autenticacion.userId.subscribe((id)=> this.adminId = id)
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((usuariosJson) => {
      this.usuarios = usuariosJson;
    });
  }

  //busca usuarios que coincidan con nombre, apellido, mail ,,
  filtrarUsuarios(): void {
    if (this.busqueda.trim() === '') {
      this.resultados = [];
      this.mostrarResultados = false;
      return;
    }

    const busq = this.busqueda.toLowerCase();

    this.resultados = this.usuarios.filter((usuario) => {
      return (
        usuario.nombre.toLowerCase().includes(busq) ||
        usuario.apellido.toLowerCase().includes(busq) ||
        usuario.nombreUsuario.toLowerCase().includes(busq) || 
        usuario.email.toLowerCase().includes(busq) 
      );
    });

    this.mostrarResultados = true;
  }


}
