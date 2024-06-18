export abstract class Usuario {
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  email: string;
  password: string;
  imagen: string;
  perfil: string;

  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, password:string, imagen: string) 
  {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.email = mail;
    this.password = password;
    this.imagen = imagen;
  }
}

export class Paciente extends Usuario{
  imagen_dos: string;
  obraSocial: string;

  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, password: string, imagen: string, imagenDos: string, obraSocial: string)
  {
    super(nombre, apellido, edad, dni, mail, password, imagen);
    this.imagen_dos = imagenDos;
    this.obraSocial = obraSocial;
    this.perfil = 'paciente';
  }
}

export class Especialista extends Usuario{
  especialidades: string[];
  habilitado: boolean;

  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, password: string, imagen: string, habilitado: boolean = false, especialidades: string[]) 
  {
    super(nombre, apellido, edad, dni, mail, password, imagen);
    this.habilitado = habilitado;
    this.especialidades = especialidades;
    this.perfil = 'especialista';
  }
}

export class administrador extends Usuario{
  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, password: string, imagen: string) 
  {
    super(nombre, apellido, edad, dni, mail, password, imagen);
    this.perfil = 'administrador';
  }
}