import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Especialista, Paciente, Usuario } from '../auth/models/usuario.model';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async registro(usuario: Paciente | Especialista) {
    try {
      const urlPerfil1 = await this.subirImagen(
        `${usuario.dni}/perfil1`,
        usuario.imagen
      );
      let data: any = { ...usuario, imagen: urlPerfil1 };

      // Si es un Paciente, subimos la segunda imagen
      if ('imagen_dos' in usuario) {
        const urlPerfil2 = await this.subirImagen(
          `${usuario.dni}/perfil2`,
          usuario.imagen_dos
        );
        data.imagen_dos = urlPerfil2;
      }

      await createUserWithEmailAndPassword(
        this.auth,
        usuario.email,
        usuario.password
      );

      // Elimino la contraseña antes de guardar en Firebase
      const { password, ...paciente } = usuario;
      await this.guardarUsuario(paciente, `usuarios/`);
    } catch (error) {
      throw error;
    }
  }

  //Agregar un usuario en una collecion
  private async guardarUsuario(data: any, path: string) {
    const col = collection(this.firestore, path);
    try {
      const docRef = await addDoc(col, data);
      console.log('Documento agregado con ID:', docRef.id);
    } catch (error) {
      throw new Error('Error, no se pudo guardar el usuario en Firestore.');
    }
  }

  //Subir Imagenes
  async subirImagen(path: string, url: string) {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, path);
      await uploadString(storageRef, url, 'data_url');
      return await getDownloadURL(storageRef);
    } catch (error) {
      throw new Error('Error, no se pudo subir la imagen.');
    }
  }

  public crearMensajeError(error: string): string {
    let mensajeTipoError!: string;
    switch (error) {
      case 'auth/email-already-in-use':
        mensajeTipoError = 'El email ya está registrado.';
        break;
      case 'auth/wrong-password':
        mensajeTipoError = 'La contraseña ingresada es incorrecta';
        break;
      case 'auth/invalid-email':
        mensajeTipoError = 'La dirección de correo electrónico es incorrecta.';
        break;
      default:
        mensajeTipoError = 'Se produjo un error durante el inicio de sesión.';
        break;
    }
    return mensajeTipoError;
  }

}
