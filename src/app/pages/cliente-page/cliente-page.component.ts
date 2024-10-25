import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListEventoComponent } from '../../evento/components/list-evento/list-evento.component';

@Component({
  selector: 'app-cliente-page',
  standalone: true,
  imports: [RouterLink, ListEventoComponent],
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.css'
})
export class ClientePageComponent {

}
