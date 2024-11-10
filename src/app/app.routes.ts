import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { FiltrarEventoComponent } from './evento/components/filtrar-eventos/filtrar-eventos.component';
import { ManejoFilaComponent } from './fila/components/manejo-fila/manejo-fila.component';
import { CompraPageComponent } from './compra/pages/compra-page/compra-page.component';
import { PageDetalleEventoComponent } from './evento/pages/page-detalle-evento/page-detalle-evento.component';
import { PageEventosListComponent } from './evento/pages/page-eventos-list/page-eventos-list.component';
import { PageAddRecintoComponent } from './recinto/pages/page-add-recinto/page-add-recinto.component';
import { PageRegistroUsuarioComponent } from './usuario/pages/page-registro-usuario/page-registro-usuario.component';
import { PageAddEventoComponent } from './evento/pages/page-add-evento/page-add-evento.component';
import { PageRecintosListComponent } from './recinto/pages/page-recintos-list/page-recintos-list.component';
import { PageDetalleComponent } from './recinto/pages/page-detalle/page-detalle.component';
import { PageVerPerfilComponent } from './usuario/pages/page-ver-perfil/page-ver-perfil.component';
import { PageListAdminComponent } from './evento/pages/page-list-admin/page-list-admin.component';
import { ListDeshabilitadosAdminComponent } from './evento/components/list-deshabilitados-admin/list-deshabilitados-admin.component';
import { ListEntradasComponent } from './compra/components/list-entradas/list-entradas.component';
import { VerDetalleEntradasComponent } from './compra/components/ver-detalle-entradas/ver-detalle-entradas.component';


export const routes: Routes = [
  { path: 'administrador/:id', component: AdminPageComponent}, //list personalizada
  { path: 'add-eventos', component: PageAddEventoComponent},
  { path: 'detalle-evento/:userId/:id', component: PageDetalleEventoComponent},
  { path: 'list-eventos', component: PageEventosListComponent}, //general
  { path: 'add-recinto', component: PageAddRecintoComponent},
  { path: 'usuarios/:id', component: ClientePageComponent}, //list personalizada
  { path: '', component: InicioSesionComponent},
  { path: 'registrarse', component: PageRegistroUsuarioComponent},
  { path: 'buscar-evento', component: FiltrarEventoComponent},
  { path: 'elegir-entrada/:userId/:idEvento/:fecha', component: CompraPageComponent},
  { path: 'fila/:userId/:idEvento/:fecha', component: ManejoFilaComponent},
  { path: 'recintos', component: PageRecintosListComponent},
  { path: 'recintos/:id', component: PageDetalleComponent},
  { path: 'perfil/:id', component: PageVerPerfilComponent},
  { path: 'eventos-administrador/:id', component: PageListAdminComponent},
  { path: '', redirectTo: '/comprar-entrada', pathMatch: 'full' },
  { path: 'eventos-deshabilitados/:id', component: ListDeshabilitadosAdminComponent},
  { path: 'ver-mis-entradas/:id', component: ListEntradasComponent},
  { path: 'ver-detalle-entradas/:userId/:id', component: VerDetalleEntradasComponent}
]
