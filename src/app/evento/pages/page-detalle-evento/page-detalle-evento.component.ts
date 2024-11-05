import { Component } from '@angular/core';
import { DetalleEventoComponent } from '../../components/detalle-evento/detalle-evento.component';

@Component({
  selector: 'app-page-detalle-evento',
  standalone: true,
  imports: [DetalleEventoComponent],
  templateUrl: './page-detalle-evento.component.html',
  styleUrl: './page-detalle-evento.component.css'
})
export class PageDetalleEventoComponent {

}
