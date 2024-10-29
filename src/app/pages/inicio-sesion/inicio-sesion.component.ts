import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario/interfaces/usuario.interface';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit{

  constructor (private router: Router){}

  userService = inject(UsuarioService);

  ngOnInit(): void {
    this.getusersDB();
  }

  usuariosDB: { nombreUsuarioDB: string, contraseniaDB: string, tipoDB: number, idUserDB: string | undefined }[] = [];

  submitted = false;

  getusersDB() {
    this.userService.getUsuarios().subscribe(
      {
        next: (users: Usuario[]) => {
          users.forEach(user => {
            this.usuariosDB.push({
              nombreUsuarioDB: user.nombreUsuario, // Asegúrate de que "user.user" y "user.password" sean los nombres correctos en tu modelo
              contraseniaDB: user.contrasenia,
              tipoDB: user.tipo,
              idUserDB : user.id
            });
          });
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    );
  }

  existeUsuario(nombreUsuarioForm: string, contraseniaForm: string): any {
    return this.usuariosDB.filter(user => user.nombreUsuarioDB == nombreUsuarioForm )
  }


  encontrarTipo(nombreUsuarioForm: string): number {
    let tipoEncontrado = 0;
    this.usuariosDB.forEach(user => {
      if (user.nombreUsuarioDB == nombreUsuarioForm)
      {
        tipoEncontrado= user.tipoDB;
      }
    });

    return tipoEncontrado;
  }

  iniciarSesion(form: NgForm){

    if (form.valid) {

      let user = this.existeUsuario(form.value.usuarioForm, form.value.contraseniaForm)
      if (user) {
        if (user.tipoDB == 1){
          this.router.navigate(["admin"]);
        }
        else if (user.tipoDB == 2){
          this.router.navigate(["cliente", user.idUserDB])
        }

      } else {
        alert("Usuario o contraseña incorrecta");
      }
    }
  }

}
