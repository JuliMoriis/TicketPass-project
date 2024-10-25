import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { VerEventoComponent } from './evento/components/ver-evento/ver-evento.component';
import { AddEventoComponent } from './evento/components/add-evento/add-evento.component';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';

export const routes: Routes = [
  { path: '', component: AdminPageComponent}, // pagina admin
  { path: 'ver-eventos', component: VerEventoComponent}, // pagina para ver el listado
  { path: 'add-eventos', component: ListEventoComponent}

];
