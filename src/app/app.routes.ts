import { Routes } from '@angular/router';
import { FormPacienteComponent } from './componentes-form/form-paciente/form-paciente.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'paciente',
    component: FormPacienteComponent
  }
];
