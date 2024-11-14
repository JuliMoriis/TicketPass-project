import { Component } from '@angular/core';
import { ListEntradasComponent } from "../../components/list-entradas/list-entradas.component";

@Component({
  selector: 'app-page-mis-entradas',
  standalone: true,
  imports: [ListEntradasComponent],
  templateUrl: './page-mis-entradas.component.html',
  styleUrl: './page-mis-entradas.component.css'
})
export class PageMisEntradasComponent {

}
