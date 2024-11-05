import { Component } from '@angular/core';
import { AddUsuarioComponent } from '../../component/add-usuario/add-usuario.component';

@Component({
  selector: 'app-page-registro-usuario',
  standalone: true,
  imports: [AddUsuarioComponent],
  templateUrl: './page-registro-usuario.component.html',
  styleUrl: './page-registro-usuario.component.css'
})
export class PageRegistroUsuarioComponent {

}
