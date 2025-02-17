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

  private compraService = inject(CompraService)
  private authService = inject(Autenticacion)

  listaCompras: Compra [] = []
  idUsuario: string | null = null;


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
          this.listaCompras= compras.filter(compra => compra.cliente.idCliente == this.idUsuario);
          console.log(this.listaCompras);
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
        Swal.fire({
          title: "Entrada dada de baja",
          confirmButtonColor: "#36173d",
          icon: 'success'
        });
      },
      error: (e: Error) => {
        Swal.fire({
          title: "Error al dar de baja la entrada",
          confirmButtonColor: "#36173d",
          icon: 'error'
        });
      }
  })
  }

  confirmarBajaEntrada(compra: Compra){
    Swal.fire({
      title: `¿Esta seguro que desea devolver su entrada para el evento "${compra.evento.nombreEvento}"?`,
      text: 'Esta accion no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: "Dar de baja",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#36173d",
      cancelButtonColor: "#ff4845b2",
      icon: "warning"
    }).then((result) => {
      if (result.isConfirmed){
        this.bajaEntrada(compra)
      }
    })
  }


}


