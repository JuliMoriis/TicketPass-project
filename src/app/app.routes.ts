import { Routes } from '@angular/router';
import { AddEventoComponent } from './evento/components/add-evento/add-evento.component';
import { ListEventoComponent } from './evento/components/list-evento/list-evento.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { AddUsuarioComponent } from './usuario/component/add-usuario/add-usuario.component';
import { FiltrarEventoComponent } from './evento/components/filtrar-eventos/filtrar-eventos.component';
import { DetalleEventoComponent } from './evento/components/detalle-evento/detalle-evento.component';
import { AddCompraComponent } from './compra/components/add-compra/add-compra.component';
import { ManejoFilaComponent } from './fila/components/manejo-fila/manejo-fila.component';
import { CompraPageComponent } from './compra/pages/compra-page/compra-page.component';
import { PageDetalleEventoComponent } from './evento/pages/page-detalle-evento/page-detalle-evento.component';
import { PageEventosListComponent } from './evento/pages/page-eventos-list/page-eventos-list.component';
import { PageAddRecintoComponent } from './recinto/pages/page-add-recinto/page-add-recinto.component';
import { PageRegistroUsuarioComponent } from './usuario/pages/page-registro-usuario/page-registro-usuario.component';
import { PageAddEventoComponent } from './evento/pages/page-add-evento/page-add-evento.component';


export const routes: Routes = [
  { path: 'administrador/:id', component: AdminPageComponent}, 
  { path: 'add-eventos', component: PageAddEventoComponent},
  { path: 'detalle-evento/:userId/:id', component: PageDetalleEventoComponent},
  { path: 'list-eventos', component: PageEventosListComponent},
  { path: 'add-recinto', component: PageAddRecintoComponent},
  { path: 'usuarios/:id', component: ClientePageComponent},
  { path: '', component: InicioSesionComponent},
  { path: 'registrarse', component: PageRegistroUsuarioComponent},
  { path: 'buscar-evento', component: FiltrarEventoComponent},
  { path: 'elegir-entrada/:userId/:idEvento/:fecha', component: CompraPageComponent},
  { path: 'fila/:userId/:idEvento/:fecha', component: ManejoFilaComponent},
  { path: '', redirectTo: '/comprar-entrada', pathMatch: 'full' }
];
