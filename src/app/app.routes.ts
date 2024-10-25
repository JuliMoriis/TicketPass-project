import { Routes } from '@angular/router';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';
import { VerEventoComponent } from './evento/components/ver-evento/ver-evento.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: AdminPageComponent}, // pagina admin
  { path: 'ver-eventos', component: VerEventoComponent}, // pagina para ver el listado
  { path: 'add-eventos', component: ListEventoComponent}

];
