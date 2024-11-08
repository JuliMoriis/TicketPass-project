import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario/interfaces/usuario.interface';
import { Autenticacion } from '../../services/autenticacion.service';


@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})

export class InicioSesionComponent implements OnInit{

  constructor (private router: Router){}

  private auth = inject(Autenticacion);

  userService = inject(UsuarioService);

  ngOnInit(): void {
    this.getusersDB();
  }

  usuariosDB: Usuario [] = [];

  submitted = false;

  getusersDB() {
    this.userService.getUsuarios().subscribe(
      {
        next: (users: Usuario[]) => {
          this.usuariosDB = users;
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    );
  }

  existeUsuario(nombreUsuarioForm: string, contraseniaForm: string): Usuario | undefined{
    return this.usuariosDB.find(user => user.nombreUsuario == nombreUsuarioForm  && contraseniaForm == user.contrasenia)
  }

  iniciarSesion(form: NgForm){

    if (form.valid) {

      let user = this.existeUsuario(form.value.usuarioForm, form.value.contraseniaForm)
      if (user) {

        if (user.tipo == 1){
          this.router.navigate(["administrador", user.id]);
          if(user.id)
          this.auth.login(1, user.id)
        }
        else if (user.tipo == 2){
          this.router.navigate(["usuarios", user.id])
          if(user.id)
          this.auth.login(2, user.id)
        }

      } else {
        alert("Usuario o contraseña incorrecta");
      }
    }
  }

}
