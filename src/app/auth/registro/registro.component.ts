import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Especialista, Paciente } from '../models/usuario.model';
import { FormPacienteComponent } from '../../componentes-form/formulario/form-paciente.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    FormPacienteComponent,
    CommonModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  private authServicio = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  public perfilUsuario: 'paciente' | 'especialista';
  public flagPaciente: boolean;
  public loading: boolean = false;
  public mensaje: string;
  @ViewChild(FormPacienteComponent)
  formPacienteComponent: FormPacienteComponent;

  ngOnInit(): void {
    this.openModal();
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.perfilUsuario =
        result === 'especialista' ? 'especialista' : 'paciente';
      this.cdr.detectChanges();
      //console.log(`Dialog result: ${result}`);
      //console.log(`Dialog result: ${this.tipousuario}`);
    });
  }

  //  setTipoUsuario(tipo: 'paciente' | 'especialista') {
  //   this.tipoUsuario = tipo;
  // }

  registro(usuario: Paciente | Especialista) {
    this.formPacienteComponent.spinner = true;
    this.authServicio
      .registro(usuario)
      .then(() => {
        this.formPacienteComponent.spinner = false;
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 3000,
        });
      })
      .catch((error) => {
        this.mensaje = this.authServicio.crearMensajeError(error.code);
        this.formPacienteComponent.spinner = false;
        this.snackBar.open(
          this.mensaje || 'Error al registrar usuario',
          'Cerrar',
          { duration: 3000 }
        );
      });
  }
}


//Angular solo verifica los cambios cuando las entradas del componente cambian o cuando se desencadenan eventos específicos