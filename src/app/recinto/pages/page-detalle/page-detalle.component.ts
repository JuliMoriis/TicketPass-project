import { Component } from '@angular/core';
import { DetalleRecintoComponent } from "../../components/detalle-recinto/detalle-recinto.component";

@Component({
  selector: 'app-page-detalle',
  standalone: true,
  imports: [DetalleRecintoComponent],
  templateUrl: './page-detalle.component.html',
  styleUrl: './page-detalle.component.css'
})
export class PageDetalleComponent {

}
