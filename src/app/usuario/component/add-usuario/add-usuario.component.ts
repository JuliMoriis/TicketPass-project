import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';


@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit{

  constructor(private router: Router) {};

  nombresUsuario: string[] = [];

  fb = inject(FormBuilder);
  usuariosService = inject(UsuarioService);

  ngOnInit(): void {
      this.listarNombreUsuario();
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
    tipo:[2, [Validators.required]]
  })


  guardarUsuarioJSON(usuario: Usuario) {
    this.usuariosService.postUsuario(usuario).subscribe({
      next: () => {
        console.log('Usuario agregado exitosamente');
      },
      error: (err) => {
        alert('Error al agregar el usuario: ' + err.message);
        console.error('Error:', err);
      }
    });
  }

  // función para agregar el usuario
  addUsuario() {

    if (this.formularioUsuario.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const usuario: Usuario = this.formularioUsuario.getRawValue();
    const usuarioEncontrado = this.nombresUsuario.find(nombre => nombre == usuario.nombreUsuario);
    console.log(usuarioEncontrado);
    if (usuarioEncontrado)
    {
      alert("El nombre de usuario ya esta en uso!");
      //ver en css poner en rojo el campo usuario
    }
    else
    {
      alert('usuario registrado con exito');
      this.guardarUsuarioJSON(usuario);
    }

  }

  inicSesionRout(){
    this.router.navigate([''])
  }
}