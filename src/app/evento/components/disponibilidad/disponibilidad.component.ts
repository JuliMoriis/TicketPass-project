import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disponibilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disponibilidad.component.html',
  styleUrl: './disponibilidad.component.css'
})
export class DisponibilidadComponent {

  @Input() evento?: Evento

  @Input() ventana?: boolean ;

  @Output() cerrar = new EventEmitter<void>();

  cerrarVentana(): void {
    this.cerrar.emit();
  }

}
