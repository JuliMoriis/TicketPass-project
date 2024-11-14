import { Compra } from './../../interfaces/compra.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CompraService } from '../../../services/compra.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Autenticacion } from '../../../services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-entradas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-entradas.component.html',
  styleUrl: './list-entradas.component.css'
})
export class ListEntradasComponent implements OnInit{

  compraService = inject(CompraService)
  listaCompras: Compra [] = []

  idUsuario: string | null = null;
  private authService = inject(Autenticacion)

  ngOnInit(): void {
    this.authService.userId.subscribe((id) => {
      this.idUsuario = id;
      console.log('ID Usuario obtenido en compra:', this.idUsuario);
    });

    this.listarCompras();
  }

  listarCompras(){
    this.compraService.getCompras().subscribe(
      {
        next: (compras: Compra[])=>{
          this.listaCompras= compras;
        },
        error: (err)=> {
          console.error('Error al levantar compras:', err);
        }
      }
    )
  }

  bajaEntrada(compra: Compra){
    compra.alta = false;

    if (compra.id)
    this.compraService.putCompra(compra.id, compra).subscribe({
      next: () => {

      },
      error: (e: Error) => {

      }
  })
  }

}


