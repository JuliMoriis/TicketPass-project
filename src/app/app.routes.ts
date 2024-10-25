import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';

export const routes: Routes = [
  { path: '', component: AdminPageComponent}, // pagina admin
  { path: 'eventos', component: ListEventoComponent} // pagina para ver el listado
];
