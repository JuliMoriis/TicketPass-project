import { Routes } from '@angular/router';
import { AddEventoComponent } from './evento/components/add-evento/add-evento.component';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { RecintoPageComponent } from './recinto/pages/recinto-page/recinto-page.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { AddUsuarioComponent } from './usuario/component/add-usuario/add-usuario.component';
import { FiltrarEventoComponent } from './evento/components/filtrar-eventos/filtrar-eventos.component';
import { DetalleEventoComponent } from './evento/components/detalle-evento/detalle-evento.component';
import { AddCompraComponent } from './compra/components/add-compra/add-compra.component';
import { ManejoFilaComponent } from './fila/components/manejo-fila/manejo-fila.component';


export const routes: Routes = [
  { path: 'administrador/:id', component: AdminPageComponent}, // aca va el id tamb
  { path: 'add-eventos', component: AddEventoComponent},
  { path: 'detalle-evento/:userId/:id', component: DetalleEventoComponent },
  { path: 'list-eventos', component: ListEventoComponent},
  { path: 'add-recinto', component: RecintoPageComponent},
  { path: 'usuarios/:id', component: ClientePageComponent},
  { path: '', component: InicioSesionComponent},
  { path: 'registrarse', component: AddUsuarioComponent},
  { path: 'buscar-evento', component: FiltrarEventoComponent},
  { path: 'elegir-entrada/:userId/:idEvento/:fecha', component: AddCompraComponent},
  { path: 'fila/:userId/:idEvento/:fecha', component: ManejoFilaComponent},
  { path: '', redirectTo: '/comprar-entrada', pathMatch: 'full' }
];
