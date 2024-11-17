import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CompraService } from '../../../services/compra.service';
import { Compra } from '../../interfaces/compra.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../evento/interfaces/evento.interface';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-ver-detalle-entradas',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './ver-detalle-entradas.component.html',
  styleUrl: './ver-detalle-entradas.component.css'
})
export class VerDetalleEntradasComponent {

  //captura los datos de la entrada en html
  @ViewChild('entrada', { static: false }) entrada!: ElementRef;

  private comprasService= inject(CompraService);
  private eventoService = inject(EventoService)
  private userService= inject(UsuarioService);
  private active = inject(ActivatedRoute)
  private authService = inject(Autenticacion)

  compraSeleccionada: Compra | undefined;
  usuario: Usuario | undefined;

  id: string | null = ''
  userId: string | null = ''
  urlBanner: string = ''

  constructor(private router: Router){}

  ngOnInit(): void {
    this.authService.userId.subscribe((id) => {
      this.userId = id;
      console.log('ID Usuario obtenido en entrada:', this.userId);
    });

    this.active.paramMap.subscribe(param => {
      const id = param.get('id');

      if (id) {
        this.comprasService.getCompraById(id).subscribe({
          next: (compraSeleccionada: Compra) => {
            this.compraSeleccionada = compraSeleccionada;
            this.buscarEvento ()
          },
          error: (e: Error) => {
            console.log("Error obteniendo la compra:", e.message);
          }
        });
      } else {
        console.log("ID de compra no encontrado en los parámetros de la ruta.");
      }

      if (this.userId) {
        this.userService.getUsuariosById(this.userId).subscribe({
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

  buscarEvento ()
  {
    if (this.compraSeleccionada?.evento.idEvento)
    this.eventoService.getEventosById(this.compraSeleccionada?.evento.idEvento).subscribe({
      next : (eventoJson : Evento)=> {
        this.urlBanner = eventoJson.UrlBanner;
      },
      error :(e: Error)=> {
        console.log(e.message);
      }
  })
  }


  descargarEntrada() {
    const entradaPdf = this.entrada.nativeElement;

    html2canvas(entradaPdf).then(canvas => {
      const imagenPdf = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      if (this.compraSeleccionada?.qrEntrada) {
        const qrImagen = this.compraSeleccionada?.qrEntrada;
        pdf.addImage(qrImagen, 'PNG', 10, 10, 50, 50);
      }

      pdf.addImage(imagenPdf, 'PNG', 10, 70, 180, 130);

      pdf.save('entradaPdf');
    });
  }




}
