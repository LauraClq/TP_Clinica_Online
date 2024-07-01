import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormsModule, ReactiveFormsModule, AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent implements OnInit {
  public formularioUsuario: FormGroup;
  public urlImagenPerfil1: string | ArrayBuffer;
  public urlImagenPerfil2: string | ArrayBuffer;
  public spinner: boolean = false;
  public mensajeImagen: boolean = false;

  @Input() usuarioElegido: string;
  @Output() emitUsuario = new EventEmitter<any>(); //por el momento lo dejo asi
  matcher = new MyErrorStateMatcher();

  constructor(private fromBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formularioUsuario = this.fromBuilder.group({
      nombre: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      edad: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(18),
          Validators.max(90),
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
      perfil1: ['', [Validators.required]],
      perfil2: ['', [Validators.required]],
    });
  }

  get nombre(): AbstractControl {
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

  registroUsuario(): void {
    if (this.formularioUsuario.valid) {
    }
  }

  //Evento - Visualizar las imagenes seleccionadas
  imagenPerfil1(event: any): void {
    const file = event.target.file[0];
    const imagenId = event.target.id;

    if (file.size < 100 * 1024) {
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

    if (file.size < 100 * 1024) {
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

  // reseteo(){
  // this.formularioUsuario.reset(); // Restablece los valores de los controles al inicial
  // this.formularioUsuario.patchValue(this.formularioUsuario.value); // Asegura que los valores sean actualizados
  // Object.keys(this.formularioUsuario.controls).forEach((key) => {
  //   this.formularioUsuario.controls[key].setErrors(null); // Elimina los errores de validación
  // });
  // }
}
