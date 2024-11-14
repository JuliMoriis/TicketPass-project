import { Component, inject, OnInit } from '@angular/core';
import { CompraService } from '../../../services/compra.service';
import { Compra } from '../../interfaces/compra.interface';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FiltrarComprasComponent } from "../filtrar-compras/filtrar-compras.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-entradas-admin',
  standalone: true,
  imports: [RouterModule, FiltrarComprasComponent, CommonModule],
  templateUrl: './list-entradas-admin.component.html',
  styleUrl: './list-entradas-admin.component.css'
})
export class ListEntradasAdminComponent implements OnInit{

  private compraService= inject(CompraService)

  filtro: string = 'todos'

  compras?: Compra []
  comprasFiltradas?: Compra[]

  ngOnInit(): void {
    this.compraService.getCompras().subscribe({
      next : (comprasJson: Compra[])=>{
        this.compras = comprasJson
        this.comprasFiltradas= this.compras
      },
      error: (e:Error)=> {
        console.log(e.message);
      }
    })
  }

  habilitarDeshabilitar (compra: Compra)
  {
    const accion = compra.alta ? 'deshabilitado' : 'habilitado';
    compra.alta = !compra.alta;
    if (compra.id)
    this.compraService.putCompra(compra.id, compra).subscribe({
      next: () => {
        Swal.fire({
          title: `Recinto ${accion} correctamente`,
          confirmButtonColor: "#36173d",
          icon: "success"
        });
      },
      error: (e: Error) => {
        console.log(e.message);
        Swal.fire({
          title: `Error al ${accion === 'habilitado' ? 'habilitar' : 'deshabilitar'} el recinto`,
          confirmButtonColor: "#36173d",
          icon: "error"
        });
      }
  })
  }

  confirmarDHR(compra: Compra){

    const accion = compra.alta ? 'dar de baja' : 'habilitar';

    Swal.fire({
      title: `¿Desea ${accion} la compra?`,
      text: `Esta acción hará que la compra ${accion === 'dar de baja' ? 'se deshabilite' : 'se habilite'} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#36173d',
      cancelButtonColor: '#ff4845',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habilitarDeshabilitar(compra);
      }
    });
  }

  filtrarComprasPorEstado(estado: string): void {
    this.filtro = estado;
    if (estado === 'habilitado') {
      this.comprasFiltradas = this.compras?.filter(compra => compra.alta === true);
    } else if (estado === 'deshabilitado') {
      this.comprasFiltradas = this.compras?.filter(compra => compra.alta === false);
    } else {
      this.comprasFiltradas = this.compras;
    }
  }


}
