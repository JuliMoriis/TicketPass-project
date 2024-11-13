import { Component, inject, Input, OnInit } from '@angular/core';
import { AddEventoComponent } from '../add-evento/add-evento.component';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-list-evento',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-evento.component.html',
  styleUrl: './list-evento.component.css'
})

//compartida con cliente y admin, con visual principal
export class ListEventoComponent implements OnInit{

  userId: string | null = '' //id del evento

  private authService = inject(Autenticacion)
  eventosService= inject(EventoService);
  listaEventos: Evento [] = [];


  ngOnInit(): void {
    this.authService.userId.subscribe((id) => {
      this.userId = id;
      console.log('ID Usuario obtenido en list:', this.userId);
    });

     this.listarEventos();
  }

  listarEventos()
  {
    this.eventosService.getEventos().subscribe(
      {
        next: (eventos: Evento[])=>{
          this.listaEventos= eventos;
        },
        error: (err)=> {
          console.error('Error al levantar eventos:', err);
        }
      }
    )
  }


  currentIndex: number = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.listaEventos.filter(evento => evento.alta === 1).length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.listaEventos.filter(evento => evento.alta === 1).length) %
      this.listaEventos.filter(evento => evento.alta === 1).length;
  }


}
