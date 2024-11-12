import { RecintoService } from './../../../services/recintos.service';
import { Component, inject, OnInit, Output } from '@angular/core';
import { Recinto } from '../../interfaces/recinto.interface';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-recinto',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-recinto.component.html',
  styleUrl: './list-recinto.component.css'
})
export class ListRecintoComponent implements OnInit{

  recintosService= inject(RecintoService);

  listaRecintos: Recinto[] = [];

  ngOnInit(): void {
    this.listarRecintos();
  }

  listarRecintos()
  {
    this.recintosService.getRecintos().subscribe(
      {
        next: (recintos: Recinto[])=>{
          this.listaRecintos= recintos;
        },
        error: (err)=> {
          console.error('Error al levantar recintos:', err);
        }
      }
    )
  }

  addListaRecinto (recinto: Recinto){
    this.listaRecintos.push({...recinto});
  }

  habilitarDeshabilitar (recinto: Recinto)
  {
    const accion = recinto.alta ? 'deshabilitado' : 'habilitado';
    recinto.alta = !recinto.alta;
    if (recinto.id)
    this.recintosService.putRecinto(recinto.id, recinto).subscribe({
      next: () => {
        Swal.fire({
          title: `Recinto ${accion} correctamente`,
          confirmButtonColor: "#36173d",
          icon: "success"
        });
      },
      error: (e: Error) => {
        console.log(e.message);
        Swal.fire({
          title: `Error al ${accion === 'habilitado' ? 'habilitar' : 'deshabilitar'} el recinto`,
          confirmButtonColor: "#36173d",
          icon: "error"
        });
      }
  })
  }

  confirmarDHR(recinto: Recinto){

    const accion = recinto.alta ? 'deshabilitar' : 'habilitar';

    Swal.fire({
      title: `¿Desea ${accion} el recinto?`,
      text: `Esta acción hará que el recinto ${accion === 'deshabilitar' ? 'no este disponible' : 'este disponible'} para la carga de eventos.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#36173d',
      cancelButtonColor: '#ff4845',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habilitarDeshabilitar(recinto);
      }
    });
  }

}



