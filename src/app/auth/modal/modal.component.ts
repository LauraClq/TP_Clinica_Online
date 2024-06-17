import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}
  selectUser(tipoUsuario: any): void {
    this.dialogRef.close(tipoUsuario);
  }
}
