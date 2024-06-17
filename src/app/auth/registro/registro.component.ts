import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Especialista, Paciente } from '../models/usuario.model';
import { FormPacienteComponent } from '../../componentes-form/form-paciente/form-paciente.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


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
  public tipoUsuario: any;
  public flagPaciente: boolean;

  ngOnInit(): void {
    this.openModal();
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'especialista') {
        this.tipoUsuario = Especialista;
      } else {
        this.tipoUsuario = Paciente;
        this.flagPaciente = true;
      }
      this.cdr.detectChanges();
      //console.log(`Dialog result: ${result}`);
      //console.log(`Dialog result: ${this.tipoUsuario}`);
    });
  }

  registro(usuario: Paciente | Especialista) {
    this.authServicio.registro(usuario);
  }
}


//Angular solo verifica los cambios cuando las entradas del componente cambian o cuando se desencadenan eventos específicos