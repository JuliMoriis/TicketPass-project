import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recinto } from '../../interfaces/recinto.interface';
import { RecintoService } from '../../../services/recintos.service';

@Component({
  selector: 'app-filtrar-recintos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, RouterModule],
  templateUrl: './filtrar-recintos.component.html',
  styleUrls: ['./filtrar-recintos.component.css']
})
export class FiltrarRecintoComponent implements OnInit {

  recintos: Recinto[] = [];
  resultados: Recinto[] = [];
  busqueda: string = '';

  mostrarResultados = false;

  constructor(private recintoService: RecintoService) {}

  ngOnInit(): void {
    this.obtenerRecintos();
  }

  obtenerRecintos(): void {
    this.recintoService.getRecintos().subscribe((recintos) => {
      this.recintos = recintos;
    });
  }

  //busca recintos que coincidan con la ubicacion, nombre ,,
  filtrarRecintos(): void {
    if (this.busqueda.trim() === '') {
      this.resultados = [];
      this.mostrarResultados = false;
      return;
    }

    const busq = this.busqueda.toLowerCase();

    this.resultados = this.recintos.filter((recinto) => {
      return (
        recinto.nombreRecinto.toLowerCase().includes(busq) ||
        recinto.direccion.ciudad.toLowerCase().includes(busq) ||
        recinto.direccion.calle.toLowerCase().includes(busq)
      );
    });

    this.mostrarResultados = true;
  }


}
