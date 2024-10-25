import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';
import { EventoPageComponent } from "./evento/pages/evento-page/evento-page.component";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RecintoPageComponent } from "./recinto/pages/recinto-page/recinto-page.component";
import { UsuarioPageComponent } from './usuario/pages/usuario-page/usuario-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecintoPageComponent, EventoPageComponent, ListEventoComponent, UsuarioPageComponent, AdminPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicketPass-project';
}


