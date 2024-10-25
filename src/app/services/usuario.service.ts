import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../usuario/interfaces/usuario.interface';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UsuarioService{

  urlBase = 'http://localhost:3002/usuarios';

  constructor (private http: HttpClient){};

  getUsuarios (): Observable <Usuario[]>{
   return this.http.get<Usuario[]>(this.urlBase);
  }

  postUsuario(usuario: Usuario){
   return this.http.post<Usuario>(this.urlBase, usuario);
  }

  verificarNombreUsuario (nombreUsuario: string): Promise<boolean>
  {

    return this.getUsuarios().toPromise().then()
  }

  // checkUsernameExists(username: string): Observable<boolean> {
  //   //transforma promesa en observable
  //   return this.getUsuarios().pipe(
  //     map(usuarios => usuarios.some(usuario => usuario))
  //   )
  // }


}
