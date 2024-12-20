import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recinto } from '../recinto/interfaces/recinto.interface';

@Injectable({
  providedIn: 'root', 
})

export class RecintoService {
   urlBase: string =   'http://localhost:3000/recintos';

   constructor (private http: HttpClient){};

   getRecintos (): Observable <Recinto[]>{
    return this.http.get<Recinto[]>(this.urlBase);
   }

   getRecintoById (id : number | null): Observable <Recinto> {
    return this.http.get<Recinto>(`${this.urlBase}/${id}`)
   }

   postRecintos(recinto: Recinto){
    return this.http.post<Recinto>(this.urlBase, recinto);
   }

   putRecinto (id: number | null, recinto: Recinto): Observable<Recinto>{
    return this.http.put<Recinto>(`${this.urlBase}/${id}`, recinto)
   }

}
