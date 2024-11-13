import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Autenticacion } from '../../services/autenticacion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

//header para admin/cliente/logout
export class HeaderComponent implements OnInit {

  @Input() tipoUsuario: number | null = null;
  @Input() idUsuario: string | null = null

  constructor(private router: Router) {}
  private auth = inject(Autenticacion)

  ngOnInit(): void {
    console.log('id user', this.idUsuario);
    console.log('tipoUsuario recibido:', this.tipoUsuario);
  }

  verMenu = false;

  //menu del admin
  menuDesplegable() {
    this.verMenu = !this.verMenu;
  }

  cerrarSesion() {
    this.auth.logout()
    this.router.navigate(['']);
  }
}

