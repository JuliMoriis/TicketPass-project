import { Injectable } from '@angular/core';
import { Autenticacion } from './autenticacion.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardarRutaService {

  constructor(private autenticacion : Autenticacion , private router: Router) { }

  canActivate(ruta: ActivatedRouteSnapshot, estado: RouterStateSnapshot): boolean {
    if (this.autenticacion.isLoggedIn) {
      return true;
    } else {
      localStorage.setItem('redirectUrl', estado.url);
      this.router.navigate(['/inicio-sesion']);
      return false;
    }
  }

}
