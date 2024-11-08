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
export class HeaderComponent implements OnInit {

  @Input() tipoUsuario: number | null = null;  // Esto permite recibir tipoUsuario desde el componente padre (AppComponent)
  @Input() idUsuario: string | null = null;

  constructor(private router: Router) {}
  auth = inject(Autenticacion)
  activated= inject(ActivatedRoute)

  ngOnInit(): void {
    console.log('id user', this.idUsuario);
    console.log('tipoUsuario recibido:', this.tipoUsuario);
  }

  verMenu = false;

  menuDesplegable() {
    this.verMenu = !this.verMenu;
  }

  cerrarSesion() {
    this.auth.logout()
    this.router.navigate(['']);
  }
}

