import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'https://api.mercadopago.com/checkout/preferences'; // URL de la API

  constructor(private http: HttpClient) { }

  crearPreferencia(preferencia: any): Observable<any> {
    const headers = {
      Authorization: 'TEST-3345936516743982-103013-e296ccdfd33d8d46aaa05e57d561bdf9-2036055243'
    };

    return this.http.post(this.apiUrl, preferencia, { headers });
  }


}
