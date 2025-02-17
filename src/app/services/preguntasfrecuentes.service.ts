import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntaFrecuente } from '../soporte/interfaces/pregunta-frecuente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasfrecuentesService {

  private urlBase: string = 'http://localhost:3005/preguntasFrecuentes'

  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<PreguntaFrecuente[]> {
    return this.http.get<PreguntaFrecuente[]>(this.urlBase);
  }

  postPregunta(pregunta: PreguntaFrecuente): Observable<PreguntaFrecuente> {
    return this.http.post<PreguntaFrecuente>(this.urlBase, pregunta);
  }

  putPregunta(id: string | null, pregunta: PreguntaFrecuente): Observable<PreguntaFrecuente> {
    return this.http.put<PreguntaFrecuente>(`${this.urlBase}/${id}`, pregunta);
  }

  getPreguntaById(id: string | null): Observable<PreguntaFrecuente> {
    return this.http.get<PreguntaFrecuente>(`${this.urlBase}/${id}`);
  }

  deletePregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}

