import { Component, Input } from '@angular/core';
import { ListEventosAdminComponent } from '../../components/list-eventos-admin/list-eventos-admin.component';

@Component({
  selector: 'app-page-list-admin',
  standalone: true,
  imports: [ListEventosAdminComponent],
  templateUrl: './page-list-admin.component.html',
  styleUrl: './page-list-admin.component.css'
})
export class PageListAdminComponent {
}
