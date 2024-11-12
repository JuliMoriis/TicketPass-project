import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Recinto } from '../../../recinto/interfaces/recinto.interface';
import { Sector } from '../../../recinto/interfaces/sector.interface';
import { EventoService } from '../../../services/evento.service';
import { RecintoService } from '../../../services/recintos.service';
import { Entrada } from '../../interfaces/entrada.interface';
import { Evento } from '../../interfaces/evento.interface';
import { Fecha } from '../../interfaces/fecha.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css'
})

export class AddEventoComponent implements OnInit {

  userId: string | null = null;

  constructor(private router: Router, private authService: Autenticacion) {}

  @Input()
  eventoIn?: Evento; // undefined si no pongo editar

  @Output()
  updateEvento: EventEmitter<Evento> = new EventEmitter()

  flag: boolean = false;
  fechaAgregada = false;

  recintosService = inject(RecintoService);
  eventosService = inject(EventoService);

  listadoRecintos: Recinto[] = [];
  sectoresRecinto: Sector[] = [];

  mostrarFormularioFecha = false;

  nuevaFecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas: [],
    disponibilidadTotal: 0,
    habilitado: 0
  };


  entrada: Entrada = {
    nombreSector: '',
    precio: 0,
    disponibles: 0,
    asientos: []
  }

  fecha: Fecha = {
    fecha: new Date(),
    hora: '',
    entradas: [],
    disponibilidadTotal: 0,
    habilitado: 0
  }

  evento: Evento = {
    nombreEvento: '',
    artista_banda: '',
    duracion: '',
    UrlBanner: '',
    recinto_id: 1,
    fechas: [],
    alta: 0
  }


  fechaSeleccionada = this.evento.fechas[0];

  ngOnInit(): void {

    this.authService.userId.subscribe((id) => {
      this.userId = id;
      console.log('ID Usuario en AddEventoComponent:', this.userId);
    });

    this.levantarRecintos();

    if (this.eventoIn) {
      this.evento = { ...this.eventoIn };
    }
  }

  levantarRecintos() {
    this.recintosService.getRecintos().subscribe(
      {
        next: (recintos: Recinto[]) => {
          this.listadoRecintos = recintos.filter(recinto => recinto.alta == true)
        },
        error: (err) => {
          console.error('Error al levantar recintos:', err);
        }
      }
    )
  }

  seleccionRecinto(event: any) {
    const idSeleccionado = Number(event.target.value);
    this.evento.recinto_id = idSeleccionado;

    if (!idSeleccionado) return;

    const recintoEncontrado = this.listadoRecintos.find(recinto => recinto.id === idSeleccionado);

    if (recintoEncontrado && recintoEncontrado.sectores) {
      console.log("Se encontró el recinto");
      this.sectoresRecinto = recintoEncontrado.sectores;

      this.evento.fechas.forEach(fecha => {
        fecha.disponibilidadTotal = recintoEncontrado.capacidadTotal;

        const tieneEntradasVendidas = fecha.entradas && fecha.entradas.some(e => e.disponibles < this.obtenerCapacidadSector(e.nombreSector));

        if (tieneEntradasVendidas) {
          this.actualizarEntradasConSectores(fecha.entradas, this.sectoresRecinto);
        } else {
          fecha.entradas = [];
          this.rellenarEntradas(this.sectoresRecinto, fecha);
        }

      });
    } else {
      console.log("No se encontró el recinto");
      this.sectoresRecinto = [];
    }
  }



  ///////////////////////////////////////////////////////////
  //actualizar solo sectores que todavia no hayan sido vendidos (agregar sector en editar)

  obtenerCapacidadSector(nombreSector: string): number {
    const sector = this.sectoresRecinto.find(s => s.nombreSector === nombreSector);
    return sector ? sector.capacidad : 0;
  }

  actualizarEntradasConSectores(entradasExistentes: any[], sectores: Sector[]) {
    for (const sector of sectores) {
      const entradaExistente = entradasExistentes.find(e => e.nombreSector === sector.nombreSector);
      if (!entradaExistente) {
        const nuevaEntrada = {
          nombreSector: sector.nombreSector,
          disponibles: sector.capacidad,
          precio: 0,
          asientos: sector.numerado ? sector.asientos : []
        };
        entradasExistentes.push(nuevaEntrada);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////



  rellenarEntradas(sectores: Sector[], fechaActual: Fecha) {
    for (const sector of sectores) {
      const nuevaEntrada = {
        nombreSector: sector.nombreSector,
        disponibles: sector.capacidad,
        precio: 0,
        asientos: sector.numerado ? sector.asientos : []
      };

      fechaActual.entradas.push(nuevaEntrada);
    }

  }

  rellenarPrecio (fecha:Fecha){
    const entradasPrimeraFecha = this.evento.fechas[0].entradas;

    fecha.entradas.forEach(entrada => {
      entradasPrimeraFecha.forEach(entradaCargada => {
        if (entradaCargada.nombreSector == entrada.nombreSector){
          entrada.precio = entradaCargada.precio;
        }
      })
    })
  }

  rellenarEntradaNuevaEdit (fecha: Fecha){
    const idRecinto = this.evento.recinto_id
    const recinto = this.listadoRecintos.find(recinto => recinto.id === idRecinto);

    if (recinto){
      this.rellenarEntradas(recinto?.sectores, fecha); //rellena todo menos el precio
      this.rellenarPrecio(fecha);
      fecha.disponibilidadTotal =  recinto.capacidadTotal
    }

  }


  aceptarFecha() {
    if (this.nuevaFecha.fecha && this.nuevaFecha.hora) {
      this.evento.fechas.push({ ...this.nuevaFecha });
      console.log(this.evento.fechas);   ///////////////////////////
      this.mostrarFormularioFecha = false;
      this.fechaAgregada = true;
      this.nuevaFecha = {
        fecha: new Date(),
        hora: '',
        entradas: [],
        disponibilidadTotal: 0,
        habilitado: 0
      };
      //alert('Fecha agregada correctamente');
    }
  }


  addEvento(formulario: NgForm) {

    if (formulario.invalid) return;

    let entradasCargadas = this.evento.fechas[0].entradas; /////////////PRIMERA FECHA CON SU PRECIO
    let disponibilidad = this.evento.fechas[0].disponibilidadTotal;

    //cuando se carga por primera vez

      //rellena todas las fechas iguales
      for (const fecha of this.evento.fechas) {
        fecha.entradas = entradasCargadas;
        fecha.disponibilidadTotal = disponibilidad;
      }

      Swal.fire({
        title: "¿Deseas guardar el evento?",
        showCancelButton: true,
        confirmButtonColor: "#36173d",
        cancelButtonColor: "#ff4845",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.guardarEventosJSON();
        }
      });

    console.log(this.evento);


  }

  guardarEventosJSON() {
    console.log("Evento que se enviará:", this.evento);
    this.eventosService.postEvento(this.evento).subscribe(
      {
        next: () => {
          console.log('evento agregado');
          Swal.fire({
            title: "¡Evento guardado!",
            text: "Tu evento ha sido guardado y puede ser habilitado.",
            confirmButtonColor: "#36173d",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/administrador', this.userId]);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            title: "Error al guardar el evento",
            confirmButtonColor: "#36173d",
            icon: "error"
          });
          console.error('Error:', err);
        }
      }
    )
  }

  emitUpdate(formulario: NgForm) {
    if (formulario.invalid) return;

    if (this.eventoIn) {
      this.evento.fechas.forEach(fecha => {
        this.rellenarPrecio(fecha); // ??????????????????

        if (fecha.entradas.length == 0){
          this.rellenarEntradaNuevaEdit (fecha) ///////rellena las nuevas entradas
        }

      })
    }

    this.updateEvento.emit(this.evento)
  }

}
