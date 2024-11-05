import { Component } from '@angular/core';
import { AddCompraComponent } from '../../components/add-compra/add-compra.component';

@Component({
  selector: 'app-compra-page',
  standalone: true,
  imports: [AddCompraComponent],
  templateUrl: './compra-page.component.html',
  styleUrl: './compra-page.component.css'
})
export class CompraPageComponent {

}
