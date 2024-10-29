import { Routes } from '@angular/router';
import { AddEventoComponent } from './evento/components/add-evento/add-evento.component';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';
import { VerEventoComponent } from './evento/components/ver-evento/ver-evento.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { RecintoPageComponent } from './recinto/pages/recinto-page/recinto-page.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { AddUsuarioComponent } from './usuario/component/add-usuario/add-usuario.component';
import { FiltrarEventoComponent } from './evento/components/filtrar-eventos/filtrar-eventos.component';

export const routes: Routes = [
  { path: 'admin', component: AdminPageComponent}, // pagina admin
  { path: 'ver-eventos', component: VerEventoComponent}, // pagina para ver el listado
  { path: 'add-eventos', component: AddEventoComponent},
  { path: 'list-eventos', component: ListEventoComponent},
  { path: 'add-recinto', component: RecintoPageComponent},
  { path: 'usuarios/:id', component: ClientePageComponent},
  { path: '', component: InicioSesionComponent},
  { path: 'registrarse', component: AddUsuarioComponent},

];
