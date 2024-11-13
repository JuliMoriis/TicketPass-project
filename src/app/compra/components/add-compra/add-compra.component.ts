import { Fecha } from './../../../evento/interfaces/fecha.interface';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Entrada } from '../../../evento/interfaces/entrada.interface';
import { Evento } from '../../../evento/interfaces/evento.interface';
import { EventoService } from '../../../services/evento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { Compra } from '../../interfaces/compra.interface';
import { CompraService } from '../../../services/compra.service';
import { PagoComponent } from '../../pages/pago/pago.component';
import QRCode from 'qrcode';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-add-compra',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, PagoComponent],
  templateUrl: './add-compra.component.html',
  styleUrl: './add-compra.component.css'
})

export class AddCompraComponent implements OnInit {

  constructor(private router: Router) { }

  compraRealizada: boolean = false;
  mostrarPago = false ;
  compraCompletaJson ?: Compra

  userId : string | null = null


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
      precioUnitario: 0, //segun el sector que elija
      butaca: []
    },
    cantidad: 1, //segun el input
    precioTotal: 0,
    estado: false
  }

  evento?: Evento //levantamos el evento COMPLETO
  fechaSeleccionada: Fecha = {
    fecha : new Date(),
    hora : '',
    entradas: [],
    disponibilidadTotal : 0 ,
    habilitado: 1  /* 1 fila habilitada 0 no se puede entrar a la fila */
}

  //el checkbox que selecciona el usuario
  sectorSeleccionado: string | undefined;
  asientosDisponibles: number = 0

  mensaje: string = ""

  private active = inject(ActivatedRoute)
  private userService = inject(UsuarioService)
  private eventoService = inject(EventoService)
  private compraService = inject(CompraService);
  private authService = inject(Autenticacion);

  ngOnInit(): void {

    this.authService.userId.subscribe((id) => {
      this.userId = id;
      console.log('ID Usuario obtenido en compra:', this.userId);
    });

    this.active.paramMap.subscribe(param => {
      const eventoId = param.get("idEvento");
      const fechaParam = param.get("fecha");

      this.userService.getUsuariosById(this.userId).subscribe({
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

          this.evento = eventoEncontrado;

          const fechaFiltrada = eventoEncontrado.fechas.find((fecha: Fecha) => {
            const formattedFechaParam = new Date(fechaParam! + "T00:00:00Z").toISOString().slice(0, 10);
            return new Date(fecha.fecha).toISOString().slice(0, 10) === formattedFechaParam;
          });

          if (fechaFiltrada) {
            this.fechaSeleccionada = fechaFiltrada
            this.compra.evento.fechaEvento = fechaFiltrada.fecha;
            console.log("Evento con fecha específica:", this.fechaSeleccionada);
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
    this.asientosDisponibles = entrada.disponibles;
    this.actualizarTotalPrecio()
  }

  actualizarTotalPrecio() {
    this.compra.precioTotal = this.compra.cantidad * this.compra.entrada.precioUnitario;
  }


  ////////////////////////////////////////////////////////////////

  comprarEntrada() {
    this.actualizarStockEntradas()
    this.editarEvento()
    this.postCompra()
  }

  /////////////////////////////////////////////////////////////


  actualizarStockEntradas() {
    //si es numerado --elegir butaca y ponerle que no esta disponible

    if (this.fechaSeleccionada.entradas) {

      this.fechaSeleccionada.entradas.forEach(entrada => {
        if (entrada.nombreSector == this.compra.entrada.sector) {
          if (entrada.asientos) {
            this.elegirButacaDisponible(entrada, this.compra.cantidad)
          }
          //restamos disponibilidad en fecha elegida en ese sector
          entrada.disponibles = entrada.disponibles - this.compra.cantidad;

          //actualiza el stock total (nuevo) !!!!!!!!!!!!!!!
          this.fechaSeleccionada.disponibilidadTotal = this.fechaSeleccionada.disponibilidadTotal - this.compra.cantidad;
          console.log(this.evento);

        }
      });
    }
  }

  //se llama si el sector que elegimos es numerado true
  elegirButacaDisponible(entrada: Entrada, cantidad: number) {
    let i = 1;
    entrada.asientos.forEach(asiento => {

      if (asiento.disponibilidad == true && i <= cantidad) {
        this.compra.entrada.butaca?.push(asiento.butaca) //ESTO NO FUNCIONA
        asiento.disponibilidad = false;
        i++;
      }

    });
  }

  postCompra() {
    this.compraService.postCompras(this.compra).subscribe({
      next: (compraCargada : Compra) => {
        this.compraRealizada = true; 
        console.log("compra cargada");
        this.compraCompletaJson = compraCargada
        this.generarQR(this.compraCompletaJson)
        this.mostrarPago = true;
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

  generarQR (compra: Compra){
    //url ficticio funcionaria cuando se escanea la entrada en el recinto
    const qrUrl = `http://localhost:4200/validar-entrada/${compra.id}`;
    QRCode.toDataURL(qrUrl)
      .then(url=> {
        console.log('url generado con exito');
        //guardo el url en el json de compras
        compra.qrEntrada = url ;

        if (compra.id){
          this.compraService.putCompra(compra.id , compra).subscribe({
            next: ()=> {
              console.log('compra editada con qr');
            },
            error : (e:Error)=> {
              console.log(e.message);
            }
          })
        }

      })
      .catch(e => {
        console.log(e);
      })
  }

  editarEvento() {

    this.evento?.fechas.forEach(fecha => {
      if (fecha.fecha == this.fechaSeleccionada.fecha) {
        fecha = this.fechaSeleccionada;
      }
    });

    if (this.evento?.id) {
      this.eventoService.putEvento(this.evento.id, this.evento).subscribe({
        next: () => {
          console.log('evento editado');
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      })
    }


  }


}







