import { Component } from '@angular/core';
import { DetalleUsuarioComponent } from '../../component/detalle-usuario/detalle-usuario.component';

@Component({
  selector: 'app-page-ver-perfil',
  standalone: true,
  imports: [DetalleUsuarioComponent],
  templateUrl: './page-ver-perfil.component.html',
  styleUrl: './page-ver-perfil.component.css'
})
export class PageVerPerfilComponent {

}
