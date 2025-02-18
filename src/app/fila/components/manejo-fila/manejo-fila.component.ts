import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { Evento } from '../../../evento/interfaces/evento.interface';
import { SpotifyService } from '../../../services/spotify.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/evento.service';
import { Cliente } from '../../../usuario/interfaces/cliente.interface';
import { Autenticacion } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-manejo-fila',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './manejo-fila.component.html',
  styleUrl: './manejo-fila.component.css'
})

export class ManejoFilaComponent implements OnInit {

  artistPlaylistUrl: string = ''
  canciones: any[] = [];
  cancionSeleccionada: any = null;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>; //reproduccion automatica

  estaEnFila = false
  usuario: Usuario | undefined;
  evento: Evento | undefined;
  fecha: string | null = '';
  idUser :string | null = null;
  progreso: any //barra de progreso en la fila

  private active = inject(ActivatedRoute);
  private userService = inject(UsuarioService);
  private eventoService = inject(EventoService);
  private authService= inject(Autenticacion);
  private spotifyService = inject(SpotifyService);

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.authService.userId.subscribe((id) => {
      this.idUser = id;
      console.log('ID Usuario obtenido en fila:', this.idUser);
    });

    this.active.paramMap.subscribe(param => {
      const eventoId = param.get("idEvento");
      const fechaParam = param.get("fecha");
      this.fecha = fechaParam;

      this.userService.getUsuariosById(this.idUser).subscribe({
        next: (usuarioEncontrado: Usuario) => {
          this.usuario = usuarioEncontrado;
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      });

      this.eventoService.getEventosById(eventoId).subscribe({
        next: (eventoEncontrado: Evento) => {
          this.evento = eventoEncontrado;
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      });
    });
  }

  //simula una fila con turnos
  fila: Cliente[] = [];
  turnoActual: number = 1;

  agregarCliente(nombre: string) {
    this.estaEnFila= true
    const nuevoCliente: Cliente = {
      id: this.fila.length + 1,
      nombre,
      turno: this.turnoActual++,
      haComprado: false,
      estado: 'Esperando en la fila'
    };
    this.fila.push(nuevoCliente);
    this.iniciarCompra(nuevoCliente);
  }


  //esta seria la pantalla de la fila
  iniciarCompra(cliente: Cliente) {
    const tiempoEspera = Math.floor(Math.random() * (45000 - 2000 + 1)) + 2000; //num random para la fila
    this.progreso = 0; //arranca en 0

    //progreso de la barra segun lo que falta para que termine
    this.progreso = setInterval(() => {
      if (this.progreso < 100) {
        this.progreso += 1;
      }
    }, tiempoEspera / 100);

    setTimeout(() => {
      cliente.haComprado = true;
      cliente.estado = 'Entro a comprar entrada';
      console.log(cliente.estado);
      //cuando termina el tiempo va a la page de elegir la entrada
      this.router.navigate(["elegir-entrada", this.evento?.id, this.fecha]);

      clearInterval(this.progreso);

    }, tiempoEspera);

    //mientras espera el time out
    this.levantarCanciones()

  }

  levantarCanciones (){
    if (this.evento?.artista_banda) {
      //busca en spotify las canciones que coincidan con el artista
      this.spotifyService.getCanciones(this.evento.artista_banda).subscribe({
        next: (canciones) => {
          console.log('Canciones obtenidas:', canciones);
          this.canciones = canciones.tracks.items;

          if (this.canciones.length > 0) {
            this.seleccionarCancionAleatoria();
          }
        },

        error: (e: Error) => {
          console.error('Error al obtener canciones de Spotify:', e);
        }
      });

      console.log('Artista/Banda:', this.evento.artista_banda);
      this.artistPlaylistUrl = 'https://open.spotify.com/search/' + encodeURIComponent(this.evento.artista_banda) + '?type=playlist';
      console.log('URL generada:', this.artistPlaylistUrl);

    } else {
      console.log('El evento no tiene un artista asociado.');
    }
  }

  //reproduccion automatica apenas se abre la fila
  reproducir() {
    if (this.cancionSeleccionada && this.cancionSeleccionada.preview_url && this.audioPlayer) {
        const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
        audio.onended = null; // CANCION TERMINADA

        audio.src = this.cancionSeleccionada.preview_url;

        audio.pause();
        audio.currentTime = 0;

        audio.play().then(() => { // reproduce
            console.log('Reproduciendo:', this.cancionSeleccionada.name);
        }).catch(e => console.error('Error al intentar reproducir:', e));

        audio.onended = () => {
            console.log('La canción ha terminado, seleccionando otra...');
            this.seleccionarCancionAleatoria();
        };
    } else {
      //hay varias canciones que tienen copyright y aparece esto
        console.error('No hay URL de previsualización disponible para esta canción.');
        console.log('URL de previsualización:', this.cancionSeleccionada?.preview_url);

    }
}

seleccionarCancionAleatoria() {
    if (this.canciones.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * this.canciones.length);
        this.cancionSeleccionada = this.canciones[indiceAleatorio];
        setTimeout(() => {
            this.reproducir();
        }, 100);
    } else {
        console.log('No hay canciones disponibles para reproducir.');
    }
}




}
