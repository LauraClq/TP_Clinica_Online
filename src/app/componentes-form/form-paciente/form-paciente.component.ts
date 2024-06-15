import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      ],
      imagen_perfil: ['', [Validators.required]],
      imagen_perfil2: ['', [Validators.required]],
    });
  }

  get nombre() {
    return this.formularioPaciente.get('nombre')!;
  }

  get apellido() {
    return this.formularioPaciente.get('apellido')!;
  }

  get edad() {
    return this.formularioPaciente.get('edad')!;
  }

  get dni() {
    return this.formularioPaciente.get('dni')!;
  }

  get obraSocial() {
    return this.formularioPaciente.get('obraSocial')!;
  }

  get email() {
    return this.formularioPaciente.get('email')!;
  }

  get password() {
    return this.formularioPaciente.get('password')!;
  }

  get imagen_a() {
    return this.formularioPaciente.get('imagen_perfil')!;
  }

  get imagen_b() {
    return this.formularioPaciente.get('imagen_perfil2')!;
  }

  registroPaciente(): void {
    if (this.formularioPaciente.valid) {
      const unPaciente = new Paciente(
        this.nombre.value,
        this.apellido.value,
        this.edad.value,
        this.dni.value,
        this.email.value,
        this.imagen_a.value,
        this.imagen_b.value,
        this.obraSocial.value,
        false
      );

      
    }
  }
}
