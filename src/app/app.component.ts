import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Autenticacion } from './services/autenticacion.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'TicketPass-project';

  isLoggedIn: boolean = false;
  tipoUsuario: number | null = null;
  idUsuario: string | null = null;

  constructor(
    private authService: Autenticacion,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
    });

    this.authService.userType.subscribe((userType) => {
      this.tipoUsuario = userType;
    });

    this.authService.userId.subscribe((id) => {
      this.idUsuario = id;
      console.log('ID Usuario obtenido en AppComponent:', this.idUsuario);
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}


