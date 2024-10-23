import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recinto } from '../recinto/interfaces/recinto.interface';

@Injectable({
  providedIn: 'root', // Asegúrate de que el servicio esté disponible en toda la aplicación
})

export class RecintoService {
   urlBase: string =   'http://localhost:3000/recintos';

   constructor (private http: HttpClient){};

   getRecintos (): Observable <Recinto[]>{
    return this.http.get<Recinto[]>(this.urlBase);
   }

   postRecintos(recinto: Recinto){
    return this.http.post<Recinto>(this.urlBase, recinto);
   }

}
