import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { VerEventoComponent } from '../../evento/components/ver-evento/ver-evento.component';
import { FiltrarEventoComponent } from "../../evento/components/filtrar-eventos/filtrar-eventos.component";


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterModule, FiltrarEventoComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
