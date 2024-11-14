import { Component } from '@angular/core';
import { ListEntradasAdminComponent } from "../../components/list-entradas-admin/list-entradas-admin.component";

@Component({
  selector: 'app-page-compras',
  standalone: true,
  imports: [ListEntradasAdminComponent],
  templateUrl: './page-compras.component.html',
  styleUrl: './page-compras.component.css'
})
export class PageComprasComponent {

}
