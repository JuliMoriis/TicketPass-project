import { RecintoService } from './../../../services/recintos.service';
import { Component, inject, OnInit, Output } from '@angular/core';
import { Recinto } from '../../interfaces/recinto.interface';
import { RouterModule } from '@angular/router';

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
    recinto.alta = !recinto.alta;
    if (recinto.id)
    this.recintosService.putRecinto(recinto.id, recinto).subscribe({
        next: ()=> {
          console.log("cambio en alta de recinto con exito");
        },
        error : (e: Error)=> {
          console.log(e.message);
        }
  })
  }
}
