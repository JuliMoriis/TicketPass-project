import { Component } from '@angular/core';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [AddUsuarioComponent],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {

}
