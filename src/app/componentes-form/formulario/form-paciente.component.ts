import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Paciente } from '../../auth/models/usuario.model';
import { MatError, MatFormField, MatFormFieldModule, MatLabel, FloatLabelType } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';


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
    RecaptchaModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css',
})
export class FormPacienteComponent implements OnInit {
  public formularioUsuario: FormGroup;
  public especialidades: string[] = [
    'Odontologia',
    'Dermatologia',
    'Psicologia',
  ];
  public mensajeImagenError: boolean = false;
  public urlImagenPerfil1: string | ArrayBuffer;
  public urlImagenPerfil2: string | ArrayBuffer;
  public spinner: boolean = false;
  selected = 'option2';

  @Input() usuarioElegido: string;
  @Output() emitPaciente = new EventEmitter<Paciente>();

  constructor(private fromBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formularioUsuario = this.fromBuilder.group({
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
      obraSocial: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
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

  get nombre() {
    return this.formularioUsuario.get('nombre')!;
  }

  get apellido() {
    return this.formularioUsuario.get('apellido')!;
  }

  get edad() {
    return this.formularioUsuario.get('edad')!;
  }

  get dni() {
    return this.formularioUsuario.get('dni')!;
  }

  get obraSocial() {
    return this.formularioUsuario.get('obraSocial')!;
  }

  get especialidad() {
    return this.formularioUsuario.get('especialidad')!;
  }

  get otraEspecialidad() {
    return this.formularioUsuario.get('otraEspecialidad')!;
  }

  get email() {
    return this.formularioUsuario.get('email')!;
  }

  get password() {
    return this.formularioUsuario.get('password')!;
  }

  get perfil1() {
    return this.formularioUsuario.get('perfil1')!;
  }

  get perfil2() {
    return this.formularioUsuario.get('perfil2')!;
  }

  registroPaciente(): void {
    if (this.formularioUsuario.valid) {
      const unPaciente = new Paciente(
        this.nombre.value,
        this.apellido.value,
        this.edad.value,
        this.dni.value,
        this.email.value,
        this.password.value,
        this.perfil1.value,
        this.perfil2.value,
        this.obraSocial.value
      );

      console.log('Un paciente', unPaciente);
      this.emitPaciente.emit(unPaciente);
    } else {
      console.log('Error formulario invalido');
    }
  }

  //Evento - Visualizar las imagenes seleccionadas
  imagenPerfil1(event: any): void {
    const file = event.target.files[0];
    const imagenId = event.target.id;

    if (file) {
      const reader = new FileReader();
      this.formularioUsuario.get(imagenId)?.setValue(file);
      reader.readAsDataURL(this.formularioUsuario.get(imagenId)?.value);
      reader.onload = () => {
        this.urlImagenPerfil1 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  imagenPerfil2(event: any): void {
    const file = event.target.files[0];
    const imagenId = event.target.id;

    if (file) {
      const reader = new FileReader();
      this.formularioUsuario.get(imagenId)?.setValue(file);
      reader.readAsDataURL(this.formularioUsuario.get(imagenId)?.value);
      reader.onload = () => {
        this.urlImagenPerfil2 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.formularioUsuario.controls;
  }

  // Método para validar si el campo tiene errores y ha sido tocado
  campoInvalido(nombreCampo: string) {
    const control = this.f[nombreCampo];
    return control.invalid && (control.dirty || control.touched);
  }

  // In your component class
  addOtraEspecialidad(): void {
    const nuevaEspecialidad =
      this.formularioUsuario.get('otraEspecialidad')!.value;

    // Check if the nuevaEspecialidad is not already in the array
    if (nuevaEspecialidad && !this.especialidades.includes(nuevaEspecialidad)) {
      this.especialidades.unshift(nuevaEspecialidad);

      this.formularioUsuario.get('especialidad')!.setValue(nuevaEspecialidad);
      this.formularioUsuario.get('otraEspecialidad')!.setValue('');
    }
  }

  // Custom validator function
  maxSelectedOptionsValidator(maxOptions: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedOptions = control.value;

      if (
        Array.isArray(selectedOptions) &&
        selectedOptions.length > maxOptions
      ) {
        return { maxOptionsExceeded: true };
      }

      return null;
    };
  }
}


