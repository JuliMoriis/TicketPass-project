import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { VerEventoComponent } from '../../evento/components/ver-evento/ver-evento.component';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
