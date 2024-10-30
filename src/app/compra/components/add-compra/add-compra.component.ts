import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { Evento } from '../../../evento/interfaces/evento.interface';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Compra } from '../../interfaces/compra.interface';
import { Fecha } from '../../../evento/interfaces/fecha.interface';
import { Entrada } from '../../../evento/interfaces/entrada.interface';

@Component({
  selector: 'app-add-compra',
  standalone: true,
  imports: [],
  templateUrl: './add-compra.component.html',
  styleUrl: './add-compra.component.css'
})
export class AddCompraComponent implements OnInit{

  compra: Compra = {
  fechaDeCompra: new Date(),
  cliente: {
    nombre: '',
    email: ''
  },
  evento: {
    nombreEvento: '',
    fechaEvento: new Date()
  },
  entrada: {
    sector: '',
  },
  precioTotal: 0,
  estado: false
  }

  evento?: Evento

  active = inject (ActivatedRoute)
  userService = inject(UsuarioService)
  eventoService = inject(EventoService)


ngOnInit(): void {

  this.active.paramMap.subscribe(param => {
    const userId = param.get("userId");
    const eventoId = param.get("idEvento");
    const fechaParam = param.get("fecha");

    this.userService.getUsuariosById(userId).subscribe({
      next: (usuarioEncontrado: Usuario) => {
        this.compra.cliente.idCliente = usuarioEncontrado.id
        this.compra.cliente.nombre = usuarioEncontrado.nombre
        this.compra.cliente.email = usuarioEncontrado.email
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })

    this.eventoService.getEventosById(eventoId).subscribe({
      next: (eventoEncontrado: Evento) => {
        this.compra.evento.idEvento = eventoEncontrado.id
        this.compra.evento.nombreEvento = eventoEncontrado.nombreEvento

        const fechaFiltrada = eventoEncontrado.fechas.find((fecha: Fecha) => {
          const formattedFechaParam = new Date(fechaParam! + "T00:00:00Z").toISOString().slice(0, 10);
          return new Date(fecha.fecha).toISOString().slice(0, 10) === formattedFechaParam;
        });

        if (fechaFiltrada) {
          this.evento = {
            ...eventoEncontrado,
            fechas: [fechaFiltrada]  // Solo la fecha que queremos
          };
          console.log("Evento con fecha específica:", this.evento);
        } else {
          console.log("Fecha no encontrada en el array de fechas del evento.");
        }
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  })
}

}



