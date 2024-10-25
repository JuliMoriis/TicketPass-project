import { Component } from '@angular/core';
import { ListEventoComponent } from '../../components/list-evento/list-evento.component';

@Component({
  selector: 'app-evento-page',
  standalone: true,
  imports: [ListEventoComponent],
  templateUrl: './evento-page.component.html',
  styleUrl: './evento-page.component.css'
})
export class EventoPageComponent {

}
