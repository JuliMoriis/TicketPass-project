import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';


@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit{

  nombresUsuario: string[] = [];
  usuarioExistente= false;

  fb = inject(FormBuilder);
  usuariosService = inject(UsuarioService);

  ngOnInit(): void {
      this.listarNombreUsuario();
  }

  listarNombreUsuario ()
  {
    this.usuariosService.getNombresUsuarios().subscribe(
      {
        next: (nombreUsuario: string[])=>{
          this.nombresUsuario= nombreUsuario;
          console.log(nombreUsuario);
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
    contrasenia:['', [Validators.required, Validators.minLength(8)]]
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
    const usuarioEncontrado = this.nombresUsuario.find(nombre => nombre === usuario.nombreUsuario);

    if (usuarioEncontrado)
    {
      this.usuarioExistente= true;
      alert("El nombre de usuario ya esta en uso!");
      //ver en css poner en rojo el campo usuario
    }
    else
    {
      this.guardarUsuarioJSON(usuario);
    }

  }
}