import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { PreguntaFrecuente } from '../../interfaces/pregunta-frecuente';
import { PreguntasfrecuentesService } from '../../../services/preguntasfrecuentes.service';

@Component({
  selector: 'app-add-pregunta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-pregunta.component.html',
  styleUrl: './add-pregunta.component.css'
})
export class AddPreguntaComponent {

  constructor (private preguntasFrecuentesService: PreguntasfrecuentesService){}

  nuevaPregunta: PreguntaFrecuente = {
    id: 0,
    pregunta: '',
    respuesta: ''
  };

  agregarPregunta() {
    if (this.nuevaPregunta.pregunta.trim() && this.nuevaPregunta.respuesta.trim()) {
      this.nuevaPregunta.id = Date.now();
      this.preguntasFrecuentesService.postPregunta(this.nuevaPregunta).subscribe(() => {
        alert('Pregunta agregada correctamente');
        this.nuevaPregunta = { id: 0, pregunta: '', respuesta: '' };
      });
    }
  }

}
