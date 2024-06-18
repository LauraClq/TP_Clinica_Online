import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Especialista } from '../../auth/models/usuario.model';
import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-especialista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatError,
    MatLabel,
    MatFormField,
    MatInput,
  ],
  templateUrl: './form-especialista.component.html',
  styleUrl: './form-especialista.component.css',
})
export class FormEspecialistaComponent {
  public formularioEspecialista: FormGroup;
  public mensajeImagenError: boolean = false;
  public urlImagenPerfil1: string | ArrayBuffer;
  public fileImagenPerfil1: string;

  @Output() emitEspecialista = new EventEmitter<Especialista>();

  constructor(private fromBuilder: FormBuilder) {
    this.formularioEspecialista = this.fromBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      edad: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(18),
        ],
      ],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      especilidad: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5),
        ],
      ],
      perfil1: ['', Validators.required],
      perfil2: ['', Validators.required],
    });
  }

  registroPaciente(): void {
    if (this.formularioEspecialista.valid) {
      const unEspecialista = new Especialista(
        this.formularioEspecialista.value.nombre,
        this.formularioEspecialista.value.apellido,
        this.formularioEspecialista.value.edad,
        Number(this.formularioEspecialista.value.dni),
        this.formularioEspecialista.value.email,
        this.formularioEspecialista.value.password,
        this.fileImagenPerfil1,
        false,
        this.formularioEspecialista.value.especilidad
      );

      console.log('Un especialista', unEspecialista);
      this.emitEspecialista.emit(unEspecialista);
    } else {
      console.log('Error formulario invalido');
    }
  }

  //Evento -Almacenar las imagenes seleccionadas
  imagenPerfil1(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.urlImagenPerfil1 = reader.result as string;
        this.fileImagenPerfil1 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.formularioEspecialista.controls;
  }

  // Método para validar si el campo tiene errores y ha sido tocado
  campoInvalido(nombreCampo: string) {
    const control = this.f[nombreCampo];
    return control.invalid && (control.dirty || control.touched);
  }

  limpiarFormulario() {
    this.formularioEspecialista.reset();
  }
}
