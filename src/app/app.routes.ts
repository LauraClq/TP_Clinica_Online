import { Routes } from '@angular/router';
import { BienvenidoComponent } from './features/bienvenido/bienvenido.component';
import { FormPacienteComponent } from './componentes-form/form-paciente/form-paciente.component';

export const routes: Routes = [
  {
    path: '',
    component: BienvenidoComponent,
  },
  {
    path: 'paciente',
    component: FormPacienteComponent
  }
];
