import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'formulario',
    component: FormularioComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
];
