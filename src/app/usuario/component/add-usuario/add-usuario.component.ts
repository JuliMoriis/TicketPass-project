import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';


@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {

  fb = inject(FormBuilder);

  usuariosService = inject(UsuarioService);


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

/*   validarUsuario(control: AbstractControl): void {
    this.usuariosService.verificarNombreUsuario(control.value).subscribe((existe) => {
      if (existe) {
        control.setErrors({ encontrado: true });
      } else {
        control.setErrors(null);
      }
    });
  } */

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

  // Función para agregar el usuario
  addUsuario() {
    if (this.formularioUsuario.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const usuario: Usuario = this.formularioUsuario.getRawValue(); // Tipado correcto
    this.guardarUsuarioJSON(usuario);
  }
}