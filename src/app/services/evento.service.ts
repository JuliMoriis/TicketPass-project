import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../evento/interfaces/evento.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // Asegúrate de que el servicio esté disponible en toda la aplicación
  })

  export class EventoService {
    urlBase: string = 'http://localhost:3001/eventos'
    constructor (private http: HttpClient ){};

    getEventos() : Observable <Evento[]>{
        return this.http.get<Evento[]>(this.urlBase);
    }

    postEvento (evento: Evento){
     return this.http.post<Evento>(this.urlBase, evento);
    }

  }



