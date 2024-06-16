import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Paciente } from '../../auth/models/usuario.model';


@Component({
  selector: 'app-form-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css',
})
export class FormPacienteComponent {
  public formularioPaciente: FormGroup;
  public urlImagenPerfil1: string | ArrayBuffer;
  public urlImagenPerfil2: string | ArrayBuffer;
  public fileImagenPerfil1: string;
  public fileImagenPerfil2: string;

  @Output() emitPaciente = new EventEmitter<Paciente>();

  constructor(private fromBuilder: FormBuilder) {
  
    this.formularioPaciente = this.fromBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      edad: ['', [Validators.required, Validators.min(18)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      obraSocial: ['', [Validators.required]],
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
      ]
    });
  }

  get nombre() {
    return this.formularioPaciente.get('nombre');
  }
  get apellido() {
    return this.formularioPaciente.get('apellido');
  }
  get edad() {
    return this.formularioPaciente.get('edad');
  }
  get dni() {
    return this.formularioPaciente.get('dni');
  }
  get obraSocial() {
    return this.formularioPaciente.get('obraSocial');
  }
  get email() {
    return this.formularioPaciente.get('email');
  }

  registroPaciente(): void {
    if (this.formularioPaciente.valid) {
  
      const unPaciente = new Paciente(
        this.nombre.value,
        this.apellido.value,
        this.edad.value,
        Number(this.dni.value),
        this.email.value,
        this.formularioPaciente.value.password,
        this.fileImagenPerfil1,
        this.fileImagenPerfil2,
        this.obraSocial.value
      );

      console.log('Un paciente', unPaciente);
      //this.emitPaciente.emit(unPaciente);
    } else {
      console.log('Error formulario invalido');
    }
  }

  //Evento -Almacenar las imagenes seleccionadas
  imagenPerfil1(event: any) {
    const file = event.target.files[0]; //obtengo la imagen seleccionada
    const reader = new FileReader();
    reader.onload = () => {
      this.urlImagenPerfil1 = reader.result;
      this.fileImagenPerfil1 = reader.result as string;
      //console.log('imagen1', this.fileImagenPerfil1);
    };
    reader.readAsDataURL(file);
  }

  imagenPerfil2(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.urlImagenPerfil2 = reader.result;
      this.fileImagenPerfil2 = reader.result as string;
      //console.log('imagen2', this.fileImagenPerfil2);
    };
    reader.readAsDataURL(file);
  }
}


