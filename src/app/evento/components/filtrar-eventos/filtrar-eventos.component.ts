import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { Recinto } from '../../../recinto/interfaces/recinto.interface';
import { RecintoService } from '../../../services/recintos.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-filtrar-eventos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, RouterModule],
  templateUrl: './filtrar-eventos.component.html',
  styleUrl: './filtrar-eventos.component.css'
})

export class FiltrarEventoComponent implements OnInit {

  @Input() eventos: Evento[] = [];
  resultados: Evento[] = [];
  busqueda: string = '';
  recintos: Recinto[] = [];

  tipoUsuario: number | null = null;
  eventosClientes : Evento [] = [] //solo los que tienen alta 1

  idUsuario: string | null = null

  mostrarResultados= false;

  constructor(
    private eventoService: EventoService,
    private recintoService: RecintoService,
    private authService: Autenticacion,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerRecintos();

    this.authService.userId.subscribe((id) => {
      this.idUsuario = id;
    });

    this.authService.userType.subscribe((userType) => {
      this.tipoUsuario = userType;
    });
  }

  obtenerEventos(): void {
    this.eventoService.getEventos().subscribe((eventos) => {
      this.eventos = eventos;
      this.eventosCliente(eventos)
    });
  }

  eventosCliente (eventos: Evento[]) {
    this.eventosClientes = eventos.filter(evento => evento.alta == 1);
  }

  obtenerRecintos(): void {
    this.recintoService.getRecintos().subscribe((recintos) => {
    this.recintos = recintos;
    });
  }

  filtrarEventos(): void {

    if (this.busqueda.trim() === '') {
      this.resultados = [];
      this.mostrarResultados = false;
      return;
    }

    let busq = this.busqueda.toLowerCase();
    let recintoEncontrado: Recinto | undefined;
    recintoEncontrado = this.recintos.find((recinto) =>
      recinto.nombreRecinto.toLowerCase().includes(busq)
    );

    if (this.tipoUsuario==1) //admin (puede ver todos)
    {
      this.resultados = this.eventos.filter((evento) => {
        return (
          evento.nombreEvento.toLowerCase().includes(busq) ||
          evento.artista_banda.toLowerCase().includes(busq) ||
          (recintoEncontrado && evento.recinto_id === recintoEncontrado.id)
        );
      });
    }
    else //cliente
    {
      this.resultados = this.eventosClientes.filter((evento) => {
        return (
          evento.nombreEvento.toLowerCase().includes(busq) ||
          evento.artista_banda.toLowerCase().includes(busq) ||
          (recintoEncontrado && evento.recinto_id === recintoEncontrado.id)
        );
      });
    }

    this.mostrarResultados = true;
  }

  mostrarBusqueda ()
  {
    this.mostrarResultados= !this.mostrarResultados
  }

  redirigir (eventoId?: string){
    if (this.idUsuario != null){
      console.log('hola');
      this.router.navigate(['/detalle-evento',eventoId])
    }
    else
    {
      console.log('hola2');
      this.router.navigate(['iniciar-sesion'])
    }
  }

}
