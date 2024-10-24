import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddRecintoComponent } from './recinto/components/add-recinto/add-recinto.component';
import { ListRecintoComponent } from "./recinto/components/list-recinto/list-recinto.component";
import { RecintoPageComponent } from "./recinto/pages/recinto-page/recinto-page.component";
import { AddEventoComponent } from './evento/components/add-evento/add-evento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddRecintoComponent, ListRecintoComponent, RecintoPageComponent, AddEventoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicketPass-project';
}
