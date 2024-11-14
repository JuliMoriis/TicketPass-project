import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private mercadopagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private accessToken = 'APP_USR-3345936516743982-103013-adb69433c7960f497be6c222b84b3a5c-2036055243';

  constructor(private http: HttpClient) {}

  crearPreferencia(descripcion: string, cantidad: number | undefined, precio: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    const preference = {
      items: [
        {
          title: descripcion,
          quantity: cantidad,
          unit_price: precio
        }
      ],
      back_urls: {
        success: 'http://localhost:4200/ver-mis-entradas',
        failure: 'http://localhost:4200/pagoFallido',
        pending: 'http://localhost:4200/ver-mis-entradas'
      },
      auto_return: 'approved'
    };

    return this.http.post<any>(this.mercadopagoUrl, preference, { headers });
  }

}
