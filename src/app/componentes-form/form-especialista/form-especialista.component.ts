import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Especialista } from '../../auth/models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-especialista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-especialista.component.html',
  styleUrl: './form-especialista.component.css',
})
export class FormEspecialistaComponent {
  public formularioEspecialista: FormGroup;

  constructor(private fromBuilder: FormBuilder) {
    this.formularioEspecialista = this.fromBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      edad: ['', [Validators.required, Validators.min(18)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      especidalidad: ['', [Validators.required]],
      otraEspecialidad: [
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
      imagen_perfil: ['', [Validators.required]],
    });
  }

  registroPaciente(): void {}
}
