import { Component } from '@angular/core';
import { AddEventoComponent } from '../../components/add-evento/add-evento.component';

@Component({
  selector: 'app-page-agregar-evento',
  standalone: true,
  imports: [AddEventoComponent],
  templateUrl: './page-agregar-evento.component.html',
  styleUrl: './page-agregar-evento.component.css'
})
export class PageAgregarEventoComponent {

}
