import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PreguntaFrecuente } from '../../interfaces/pregunta-frecuente';
import { PreguntasfrecuentesService } from '../../../services/preguntasfrecuentes.service';

@Component({
  selector: 'app-soporte-footer',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './soporte-footer.component.html',
  styleUrl: './soporte-footer.component.css'
})
export class SoporteFooterComponent {
 preguntas: PreguntaFrecuente[] = [];

  constructor(private preguntaService: PreguntasfrecuentesService) {}

  ngOnInit(): void {
    this.preguntaService.getPreguntas().subscribe((data) => {
      this.preguntas = data.map(pregunta => ({ ...pregunta, mostrar: false }));
    });
  }
}
