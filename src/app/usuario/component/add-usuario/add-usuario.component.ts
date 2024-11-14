import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit{

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword: boolean = false;

  constructor(private router: Router){}

  usuarioRecibido?: Usuario

  nombresUsuario: string[] = [];

  fb = inject(FormBuilder);
  usuariosService = inject(UsuarioService);

  ngOnInit(): void {
      this.listarNombreUsuario();
      console.log(this.nombresUsuario);
      if(this.usuarioRecibido)
      {
        this.formularioUsuario.setValue({
          nombre: this.usuarioRecibido.nombre,
          apellido: this.usuarioRecibido.apellido,
          telefono: this.usuarioRecibido.telefono,
          email: this.usuarioRecibido.email,
          direccion: {
            calle: this.usuarioRecibido.direccion.calle,
            numero: this.usuarioRecibido.direccion.numero,
            ciudad: this.usuarioRecibido.direccion.ciudad,
            codigoPostal: this.usuarioRecibido.direccion.codigoPostal,
            pais: this.usuarioRecibido.direccion.pais
          },
          nombreUsuario: this.usuarioRecibido.nombreUsuario,
          contrasenia: this.usuarioRecibido.contrasenia,
          pregunta: this.usuarioRecibido.pregunta,
          verificacion: this.usuarioRecibido.verificacion,
          tipo: this.usuarioRecibido.tipo
        });

      }
  }

  listarNombreUsuario ()
  {
    this.usuariosService.getUsuarios().subscribe(
      {
        next: (usuarios: Usuario[])=>{

          usuarios.forEach(usuario => {
            this.nombresUsuario.push(usuario.nombreUsuario)
          });
        },
        error: (err)=> {
          console.error('Error al levantar nombres de usuario:', err);
        }
      }
    )
  }

  formularioUsuario = this.fb.nonNullable.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    telefono:[0,[Validators.required]],
    email:['',[Validators.email, Validators.required]],
    direccion: this.fb.nonNullable.group({
      calle:['',[Validators.required]],
      numero:[0,[Validators.required]],
      ciudad:['',[Validators.required]],
      codigoPostal: ['',[Validators.required]],
      pais:['',[Validators.required]]
    }),
    nombreUsuario:['',[Validators.required, Validators.minLength(3)]],
    contrasenia:['', [Validators.required, Validators.minLength(8)]],
    pregunta: ['', [Validators.required]],
    verificacion: ['', [Validators.required]],
    tipo:[2, [Validators.required]]
  })


  guardarUsuarioJSON(usuario: Usuario) {
    this.usuariosService.postUsuario(usuario).subscribe({
      next: () => {
        console.log('Usuario agregado exitosamente');
      },
      error: (err) => {
        Swal.fire({
          title: "Error al registrarse",
          text: "Por favor, intente nuevamente",
          confirmButtonColor: "#36173d",
          icon: "error"
        })
        console.error('Error:', err);
      }
    });
  }

  editarUsuario (usuario: Usuario){
    if (usuario.id)
    this.usuariosService.putUsuario(usuario.id, usuario).subscribe({
      next : ()=> {
        Swal.fire({
          title: "Usuario editado con exito",
          confirmButtonColor: "#36173d",
          icon: "success"
        })
      },
      error: (e:Error)=> {
        console.log(e.message);
      }
    })
  }

  // función para agregar el usuario
  addUsuario() {
    if (this.formularioUsuario.invalid) {
      console.log('Formulario inválido');
      Swal.fire({
        title: "Campos vacios o inválidos",
        text: "Por favor, intente nuevamente",
        confirmButtonColor: "#36173d",
        icon: "warning"
      })
      return;
    }

    const usuario: Usuario = this.formularioUsuario.getRawValue();
    const usuarioEncontrado = this.nombresUsuario.find(nombre => nombre == usuario.nombreUsuario);
    console.log(usuarioEncontrado);

    if (usuarioEncontrado)
    {
      Swal.fire({
        title: `¡El nombre de usuario "${usuarioEncontrado}" ya esta en uso!`,
        confirmButtonColor: "#36173d",
        icon: "warning"
      });

      //ver en css poner en rojo el campo usuario
    }
    else
    {
      if (this.usuarioRecibido)
      {
        this.editarUsuario(usuario)
      }
      else
      {
        Swal.fire({
        title: "Usuario registrado con exito",
        confirmButtonColor: "#36173d",
        icon: "success"
      }).then(() => {
        this.guardarUsuarioJSON(usuario);
        this.router.navigate(['/'])
      })
      }
    }

  }


}
