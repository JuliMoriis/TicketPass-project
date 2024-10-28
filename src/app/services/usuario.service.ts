import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../usuario/interfaces/usuario.interface';
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

  getUsuariosById (id: string | null){
    return this.http.get<Usuario[]>(`${this.urlBase}/${id}`);
  }




}
