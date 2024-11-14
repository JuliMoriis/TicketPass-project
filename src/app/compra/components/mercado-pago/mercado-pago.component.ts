import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Compra } from '../../interfaces/compra.interface';
import { CompraService } from '../../../services/compra.service';
import { PagoService } from '../../../services/pago.service';

declare var MercadoPago: any;

@Component({
  selector: 'app-mercado-pago',
  standalone: true,
  imports: [],
  templateUrl: './mercado-pago.component.html',
  styleUrl: './mercado-pago.component.css'
})
export class MercadoPagoComponent {

  @Input() compra?: Compra;
  @Output() pagoExitoso = new EventEmitter<void>();

  descripcion: string = '';
  cantidad: number = 1;

  constructor(private pagoService: PagoService, private compraService: CompraService) {}

  loadMercadoPagoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof MercadoPago !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }

  ngAfterViewInit() {
    if (this.compra) {
      this.descripcion = `${this.compra.evento.nombreEvento} - ${this.compra.entrada.sector}`;
      this.cantidad = Number(this.compra.cantidad);
    }

    this.loadMercadoPagoScript()
      .then(() => {
        this.iniciarPago();
      })
      .catch((error) => {
        console.error('Error al cargar MercadoPago:', error);
      });
  }


  iniciarPago() {
    this.pagoService.crearPreferencia(this.descripcion, this.cantidad, 1)
      .subscribe({
        next: (response: any) => {
          if (response && response.id) {
            const mp = new MercadoPago('APP_USR-73f9a128-944c-4a72-82a3-f5cad1ea9d9a', {
              locale: 'es-AR'
            });

            mp.checkout({
              preference: { id: response.id },
              autoOpen: true,
              onSuccess: (paymentData: any) => {
                console.log('Pago exitoso', paymentData);
                alert('Pago realizado con éxito');
                this.pagoExitoso.emit();
              },
              onError: (error: Error) => {
                console.error('Error en el pago:', error);
                alert('Hubo un error con el pago');
              }
            });
          } else {
            console.error('ID de preferencia inválido en la respuesta');
          }
        },
        error: (err: Error) => {
          console.error('Error en la creación de preferencia:', err.message);
        }
      });
  }


}
