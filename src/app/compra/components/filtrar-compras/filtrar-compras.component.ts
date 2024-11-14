import { Component } from '@angular/core';
import { Compra } from '../../interfaces/compra.interface';
import { CompraService } from '../../../services/compra.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filtrar-compras',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './filtrar-compras.component.html',
  styleUrl: './filtrar-compras.component.css'
})
export class FiltrarComprasComponent {

  compras: Compra[] = [];  // Aquí deberías tener tus compras
  resultados: Compra[] = [];
  busqueda: string = '';
  mostrarResultados: boolean = false;

  constructor(private comprasService: CompraService) {}

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.comprasService.getCompras().subscribe((compras) => {
      this.compras = compras;
    });
  }

  // Filtra las compras por artista-banda y estado 'alta'
  filtrarCompras(): void {

    if (this.busqueda.trim() === '') {
      this.resultados = [];
      this.mostrarResultados = false;
      return;
    }

    const busq = this.busqueda.toLowerCase();

    this.resultados = this.compras.filter((compra) => {
      const eventoCoincide = compra.evento.nombreEvento.toLowerCase().includes(busq);

      return eventoCoincide
    });

    this.mostrarResultados = true;
  }
}
