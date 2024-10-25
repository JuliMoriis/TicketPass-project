import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { VerEventoComponent } from '../../evento/components/ver-evento/ver-evento.component';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [VerEventoComponent, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  constructor(private router: Router) {} // Asegúrate de importar Router

  verEventos() {
    this.router.navigate(['/ver-eventos']); // Cambia a la ruta de eventos
  }

}
