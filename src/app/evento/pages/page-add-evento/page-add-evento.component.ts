import { Component } from '@angular/core';
import { AddEventoComponent } from '../../components/add-evento/add-evento.component';

@Component({
  selector: 'app-page-add-evento',
  standalone: true,
  imports: [AddEventoComponent],
  templateUrl: './page-add-evento.component.html',
  styleUrl: './page-add-evento.component.css'
})
export class PageAddEventoComponent {

}
