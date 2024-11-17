import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasDevueltasService {

  constructor(private http : HttpClient) { }

  urlBase = ' http://localhost:3004/comprasDevueltas'


  getComprasDevueltas(): Observable<{ id: string }[]> {
    return this.http.get<{ id: string }[]>(this.urlBase);
  }

  postCompraDevuelta(id: string | undefined): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.urlBase, { id });
  }
 
}
