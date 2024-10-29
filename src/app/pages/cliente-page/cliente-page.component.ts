import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListEventoComponent } from '../../evento/components/list-evento/list-evento.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cliente-page',
  standalone: true,
  imports: [RouterLink, ListEventoComponent],
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.css'
})
export class ClientePageComponent implements OnInit{
  id: string | null = ''
  userService = inject(UsuarioService)
  active = inject(ActivatedRoute)

  ngOnInit(): void {

      this.active.paramMap.subscribe(param => {
        return this.userService.getUsuariosById(param.get('id')).subscribe({
          next : ()=>{
            this.id = param.get('id')
          },
          error : ()=> {
            
          }
        });
      })
  }
}
