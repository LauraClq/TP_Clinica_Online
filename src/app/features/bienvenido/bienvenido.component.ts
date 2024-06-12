import { Component } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {

}
