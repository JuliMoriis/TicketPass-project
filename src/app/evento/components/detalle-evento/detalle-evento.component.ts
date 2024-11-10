import { Usuario } from './../../../usuario/interfaces/usuario.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../interfaces/evento.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AddEventoComponent } from "../add-evento/add-evento.component";
import { Fecha } from '../../interfaces/fecha.interface';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, AddEventoComponent],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent implements OnInit{

  eventosService= inject(EventoService);
  userService= inject(UsuarioService);
  isEditing = false;

  eventoSeleccionado: Evento | undefined;
  usuario: Usuario | undefined;

  id: string | null = ''
  userId: string | null = ''

  active = inject(ActivatedRoute)

  constructor(private router: Router){}

  ngOnInit(): void {

    this.active.paramMap.subscribe(param => {
      const id = param.get('id');
      const userId = param.get('userId');

      if (id) {
        this.eventosService.getEventosById(id).subscribe({
          next: (eventoSeleccionado: Evento) => {
            this.eventoSeleccionado = eventoSeleccionado;
          },
          error: (e: Error) => {
            console.log("Error obteniendo el evento:", e.message);
          }
        });
      } else {
        console.log("ID de evento no encontrado en los parámetros de la ruta.");
      }

      if (userId) {
        this.userService.getUsuariosById(userId).subscribe({
          next: (usuarioEncontrado: Usuario) => {
            this.usuario = usuarioEncontrado;
          },
          error: (e: Error) => {
            console.log("Error obteniendo el usuario:", e.message);
          }
        });
      } else {
        console.log("ID de usuario no encontrado en los parámetros de la ruta.");
      }
    });
  }

  changeEdit() {
    this.isEditing = !this.isEditing;
    console.log(this.eventoSeleccionado?.alta);
  }

  updateEventos(evento: Evento){
    this.eventosService.putEvento(evento?.id, evento).subscribe({
      next:()=>{
        alert("Evento actualizado correctamente.")
      },
      error:(e: Error)=>{
        console.log(e.message);
      }
    })
  }

   deshabilitarOHabilitar(){
    if(this.eventoSeleccionado){
      if(this.eventoSeleccionado.alta === 1)
        {
          this.eventosService.deshabilitarEvento(this.eventoSeleccionado.id, 0).subscribe({
            next:()=>{
              alert("Evento deshabilitado")
              this.router.navigate(['administrador', this.usuario?.id])
            },
            error:(e: Error)=>{
              console.log(e.message);
            }
          })
        }
        else
          {
            this.eventosService.deshabilitarEvento(this.eventoSeleccionado.id, 1).subscribe({
              next:()=>{
                alert("Evento habilitado")
                this.router.navigate(['administrador', this.usuario?.id])
              },
              error:(e: Error)=>{
                console.log(e.message);
              }
            })
          }
    }

  }

  cambiarEstadoFila(fecha: Fecha) {

    const fechaActualizar = this.eventoSeleccionado?.fechas.find(f => f.fecha === fecha.fecha);

    if (fechaActualizar) {
      // Toggle the habilitado status
      fechaActualizar.habilitado = fechaActualizar.habilitado === 1 ? 0 : 1;

      if (this.eventoSeleccionado)
      this.eventosService.putEvento(this.eventoSeleccionado.id, this.eventoSeleccionado).subscribe({
        next: () => {
          console.log('Evento actualizado con éxito');
        },
        error: (e: Error) => {
          console.error('Error al actualizar el evento:', e.message);
        }
      });
    } else {
      console.error('Fecha no encontrada en eventoSeleccionado');
    }
  }

}
