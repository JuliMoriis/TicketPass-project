import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddRecintoComponent } from './recinto/components/add-recinto/add-recinto.component';
import { AddEventoComponent } from './evento/components/add-evento/add-evento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddRecintoComponent, AddEventoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicketPass-project';
}
