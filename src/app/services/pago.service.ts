import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private mercadopagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private accessToken = 'APP_USR-2657619707691625-111315-ea9d3de014b44ff660ecdb6fbbbb9d5b-240054949'; // Cambia esto por tu Access Token de Mercado Pago

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
