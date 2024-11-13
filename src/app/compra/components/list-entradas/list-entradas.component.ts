import { Compra } from './../../interfaces/compra.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CompraService } from '../../../services/compra.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idUsuario = params.get('id');
      console.log('ID Usuario en ListEntradasComponent:', this.idUsuario);
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

}


