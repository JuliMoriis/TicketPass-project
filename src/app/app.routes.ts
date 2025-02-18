import { Routes } from '@angular/router';
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
import { ListUsuarioComponent } from './usuario/component/list-usuario/list-usuario.component';
import { CambiarContraseniaComponent } from './pages/cambiar-contrasenia/cambiar-contrasenia.component';
import { PageMisEntradasComponent } from './compra/pages/page-mis-entradas/page-mis-entradas.component';
import { PageComprasComponent } from './compra/pages/page-compras/page-compras.component';
import { PageListUsuariosComponent } from './usuario/pages/page-list-usuarios/page-list-usuarios.component';
import { CambiarContraseniaSinIdComponent } from './pages/cambiar-contrasenia-sin-id/cambiar-contrasenia-sin-id.component';
import { AdminPreguntasComponent } from './soporte/pages/page-soporte-admin/page-soporte-admin.component';
import { AddPreguntaComponent } from './soporte/components/add-pregunta/add-pregunta.component';
import { SoporteFooterComponent } from './soporte/pages/soporte-footer/soporte-footer.component';


export const routes: Routes = [
  { path: '', component: ClientePageComponent}, ///general
  { path: 'iniciar-sesion', component: InicioSesionComponent},
  { path: 'add-eventos', component: PageAddEventoComponent},
  { path: 'detalle-evento/:id', component: PageDetalleEventoComponent},
  { path: 'list-eventos', component: PageEventosListComponent},
  { path: 'add-recinto', component: PageAddRecintoComponent},
  { path: 'usuarios/:id', component: ClientePageComponent}, //general
  { path: 'registrarse', component: PageRegistroUsuarioComponent},
  { path: 'buscar-evento', component: FiltrarEventoComponent},
  { path: 'elegir-entrada/:idEvento/:fecha', component: CompraPageComponent},
  { path: 'fila/:idEvento/:fecha', component: ManejoFilaComponent},
  { path: 'recintos', component: PageRecintosListComponent},
  { path: 'recintos/:id', component: PageDetalleComponent},
  { path: 'perfil/:id', component: PageVerPerfilComponent},
  { path: 'eventos-administrador/:id', component: PageListAdminComponent},
  { path: 'eventos-deshabilitados/:id', component: ListDeshabilitadosAdminComponent},
  { path: 'ver-mis-entradas', component: PageMisEntradasComponent},
  { path: 'ver-detalle-entradas/:id', component: VerDetalleEntradasComponent},
  { path: 'ver-usuarios/:adminId', component: PageListUsuariosComponent},
  { path: 'ver-detalle-usuario/:adminId/:id', component: PageVerPerfilComponent},
  { path: 'cambiar-contrasenia/:id', component: CambiarContraseniaComponent},
  { path: 'cambiar-contrasenia', component: CambiarContraseniaSinIdComponent},
  { path: 'compras', component: PageComprasComponent},
  { path: 'preguntas-frecuentes-administrador', component: AdminPreguntasComponent},
  { path: 'agregar-pregunta', component: AddPreguntaComponent},
  { path: 'soporte', component: SoporteFooterComponent},
  { path: '**', component: ClientePageComponent}

]
