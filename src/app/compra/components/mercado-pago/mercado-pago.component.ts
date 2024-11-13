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
  @Output() pagoExitoso = new EventEmitter<void>(); // Emite cuando se realiza el pago exitoso

  descripcion: string = '';

  constructor(private pagoService: PagoService, private compraService: CompraService) {}

  // Cargar el script de MercadoPago si aún no está cargado
  loadMercadoPagoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof MercadoPago !== 'undefined') {
        resolve(); // Ya está cargado
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
    }

    // Cargar el script y luego iniciar el pago
    this.loadMercadoPagoScript()
      .then(() => {
        this.iniciarPago();
      })
      .catch((error) => {
        console.error('Error al cargar MercadoPago:', error);
      });
  }

  // Función para iniciar el pago
  iniciarPago() {
    // Llamar al servicio para crear la preferencia de pago
    this.pagoService.crearPreferencia(this.descripcion, this.compra?.cantidad, 10, this.compra?.cliente.idCliente)
      .subscribe({
        next: (response: any) => {
          if (response && response.id) {
            const mp = new MercadoPago('APP_USR-73f9a128-944c-4a72-82a3-f5cad1ea9d9a', {
              locale: 'es-AR'
            });

            mp.checkout({
              preference: { id: response.id },
              autoOpen: true,
              onSuccess: () => {
                console.log('Pago exitoso');
                this.pagoExitoso.emit();
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



