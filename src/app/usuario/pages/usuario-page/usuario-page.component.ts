import { Component } from '@angular/core';
import { ListUsuarioComponent } from '../../component/list-usuario/list-usuario.component';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [ListUsuarioComponent],
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.css'
})
export class UsuarioPageComponent {

}
