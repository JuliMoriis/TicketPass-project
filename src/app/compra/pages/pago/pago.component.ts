import { Component, inject, Input } from '@angular/core';
import { Compra } from '../../interfaces/compra.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {

  //aca pondriamos la compra en estado true

  constructor(private router: Router){}
  compraService = inject(CompraService)

  @Input()
  compra?: Compra;

  pagoConfirmado(){

    console.log(this.compra?.id);

    if(this.compra?.id){
      this.compra.estado = true;

      this.compraService.putCompra(this.compra?.id, this.compra).subscribe({
        next: ()=> {
          alert('Pago realizado con exito')
          this.router.navigate(["usuarios", this.compra?.cliente.idCliente])
        },
        error: (e:Error) => {
          console.log(e.message);
        }
    })

    }

  }

}
