import { Component } from '@angular/core';
import { ListEventoComponent } from '../../components/list-evento/list-evento.component';

@Component({
  selector: 'app-page-eventos-list',
  standalone: true,
  imports: [ListEventoComponent],
  templateUrl: './page-eventos-list.component.html',
  styleUrl: './page-eventos-list.component.css'
})
export class PageEventosListComponent {

}
