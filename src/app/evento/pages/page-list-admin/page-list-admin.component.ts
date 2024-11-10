import { Component, Input } from '@angular/core';
import { ListEventosAdminComponent } from '../../components/list-eventos-admin/list-eventos-admin.component';
import { FiltrarEventoComponent } from '../../components/filtrar-eventos/filtrar-eventos.component';

@Component({
  selector: 'app-page-list-admin',
  standalone: true,
  imports: [ListEventosAdminComponent, FiltrarEventoComponent],
  templateUrl: './page-list-admin.component.html',
  styleUrl: './page-list-admin.component.css'
})
export class PageListAdminComponent {
}
