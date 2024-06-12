import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavVarComponent } from './features/nav-var/nav-var.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavVarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp_clinica_online';
}
