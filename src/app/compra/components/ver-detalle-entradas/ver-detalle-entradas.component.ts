import { Component, inject } from '@angular/core';
import { CompraService } from '../../../services/compra.service';
import { Compra } from '../../interfaces/compra.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-ver-detalle-entradas',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './ver-detalle-entradas.component.html',
  styleUrl: './ver-detalle-entradas.component.css'
})
export class VerDetalleEntradasComponent {

  comprasService= inject(CompraService);
  userService= inject(UsuarioService);

  compraSeleccionada: Compra | undefined;
  usuario: Usuario | undefined;

  id: string | null = ''
  userId: string | null = ''

  active = inject(ActivatedRoute)

  constructor(private router: Router){}

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      const id = param.get('id');
      const userId = param.get('userId');

      console.log('ID:', id, 'UserID:', userId);

      if (id) {
        this.comprasService.getCompraById(id).subscribe({
          next: (compraSeleccionada: Compra) => {
            this.compraSeleccionada = compraSeleccionada;
          },
          error: (e: Error) => {
            console.log("Error obteniendo la compra:", e.message);
          }
        });
      } else {
        console.log("ID de compra no encontrado en los parámetros de la ruta.");
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
