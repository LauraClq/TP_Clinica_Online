import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Paciente } from '../../auth/models/usuario.model';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';



@Component({
  selector: 'app-form-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatError,
    MatLabel,
    MatFormField,
    MatInput,
  ],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css',
})
export class FormPacienteComponent {
  public formularioPaciente: FormGroup;
  public mensajeImagenError: boolean = false;
  public urlImagenPerfil1: string | ArrayBuffer;
  public urlImagenPerfil2: string | ArrayBuffer;
  public fileImagenPerfil1: string;
  public fileImagenPerfil2: string;

  @Input() tipoUsuario: 'paciente';
  @Output() emitPaciente = new EventEmitter<Paciente>();

  constructor(private fromBuilder: FormBuilder) {
    this.formularioPaciente = this.fromBuilder.group({
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
      obraSocial: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
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
    if (this.formularioPaciente.valid) {
      const unPaciente = new Paciente(
        this.formularioPaciente.value.nombre,
        this.formularioPaciente.value.apellido,
        this.formularioPaciente.value.edad,
        Number(this.formularioPaciente.value.dni),
        this.formularioPaciente.value.email,
        this.formularioPaciente.value.password,
        this.fileImagenPerfil1,
        this.fileImagenPerfil2,
        this.formularioPaciente.value.obraSocial
      );

      console.log('Un paciente', unPaciente);
      this.emitPaciente.emit(unPaciente);
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

  imagenPerfil2(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.urlImagenPerfil2 = reader.result as string;
        this.fileImagenPerfil2 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.formularioPaciente.controls;
  }

  // Método para validar si el campo tiene errores y ha sido tocado
  campoInvalido(nombreCampo: string) {
    const control = this.f[nombreCampo];
    return control.invalid && (control.dirty || control.touched);
  }

  limpiarFormulario() {
    this.formularioPaciente.reset();
  }
}


