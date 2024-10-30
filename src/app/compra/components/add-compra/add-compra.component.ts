import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Entrada } from '../../../evento/interfaces/entrada.interface';
import { Evento } from '../../../evento/interfaces/evento.interface';
import { Fecha } from '../../../evento/interfaces/fecha.interface';
import { EventoService } from '../../../services/evento.service';
import { PagoService } from '../../../services/pago.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { Compra } from '../../interfaces/compra.interface';

@Component({
  selector: 'app-add-compra',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-compra.component.html',
  styleUrl: './add-compra.component.css'
})

export class AddCompraComponent implements OnInit {

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
      precioUnitario: 0 //segun el sector que elija
    },
    cantidad: 0, //segun el input 
    precioTotal: 0,
    estado: false
  }

  evento?: Evento

  //el checkbox que selecciona el usuario
  sectorSeleccionado: string | undefined;

  mensaje: string = ""

  active = inject(ActivatedRoute)
  userService = inject(UsuarioService)
  eventoService = inject(EventoService)
  pagoService = inject(PagoService);


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
            //ver si le asigna bien la fecha
            this.compra.evento.fechaEvento= fechaFiltrada.fecha;
            this.evento = {
              ...eventoEncontrado,
              fechas: [fechaFiltrada]
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

  asignarSectorYPrecio(entrada: Entrada) {
    this.compra.entrada.sector = entrada.nombreSector; 
    this.compra.entrada.precioUnitario = entrada.precio;
  }

  comprarEntrada() {

    this.compra.precioTotal = this.compra.cantidad * this.compra.entrada.precioUnitario;

    console.log(this.compra);
    
    const preferencia = {
      items: [
        {
          title: 'Entrada',
          quantity: this.compra.cantidad,
          unit_price: 1 //aca deberia ir el precio de compra pero bueno muy caro
        }
      ],
      auto_return: 'approved'
    };

    this.pagoService.crearPreferencia(preferencia).subscribe({
      next: (response)=>{
       // const mp = new MercadoPago('TU_CLAVE_PUBLICA', { locale: 'es-AR' });
        window.location.href = response.init_point; // redirigir a mp
        this.mostrarMensajeExito();
        //aca habria q restar la entrada y guardar en el json cambios y compra
      },
      error: (e: Error)=>{
        this.mensaje = 'Error al crear la preferencia: ' + e.message; 
      }
    })
  }


  mostrarMensajeExito() {
    this.mensaje = '¡Compra exitosa! Gracias por tu compra.';
  }

  //se llama una vez realizado el pago
  actualizarStockEntradas(){

  }

  //se llama si el sector que elegimos es numerado true
  elegirButacaDisponible(){

  }

}




