import { Component } from '@angular/core';
import { Entrada } from '../../entrada.interface';
import { Fecha } from '../../fecha.interface';
import { Evento } from '../../evento.interface';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css'
})
export class AddEventoComponent {
  entrada: Entrada = {
    sector_id: 1,
    precio: 0,
    disponibles: 0,
  }

  fecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas : [this.entrada]
  }

  evento: Evento ={
    nombreEvento:'',
    artista_banda: '',
    duracion:'',
    UrlBanner:'',
    recinto_id: 1,
    fecha : [this.fecha]
  }





}
