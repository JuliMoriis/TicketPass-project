import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../compra/interfaces/compra.interface';

@Injectable({
    providedIn: 'root', // Asegúrate de que el servicio esté disponible en toda la aplicación
  })

  export class CompraService {
    urlBase: string = 'http://localhost:3003/compras'
    constructor (private http: HttpClient ){};

    getCompras() : Observable <Compra[]>{
        return this.http.get<Compra[]>(this.urlBase);
    }

    postCompras (compra: Compra): Observable<Compra>{
     return this.http.post<Compra>(this.urlBase, compra);
    }

  }
