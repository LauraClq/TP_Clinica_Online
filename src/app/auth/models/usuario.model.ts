export interface Usuario {
  id: number;
  perfil: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  email: string;
  password: string;
  fotos: string[]; 
  aprobado: boolean;
}