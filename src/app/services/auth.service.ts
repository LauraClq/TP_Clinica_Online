import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { Usuario } from '../auth/models/usuario.model';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  
  async registro(usuario: Usuario): Promise<void> {
    try 
    {
      const credenciales = await createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password);
      await sendEmailVerification(credenciales.user);

      await this.guardarUsuario(usuario, 'usuarios/');

    } catch (error) {
      throw this.crearMensajeError(error.code);
    }
  }

  private async guardarUsuario(data: Omit<Usuario, 'password'>, path: string): Promise<void> {
    const col = collection(this.firestore, path);
    try {
      const docRef = await addDoc(col, data);
      console.log('Documento agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar el usuario en Firestore:', error);
      throw new Error('Error, no se pudo guardar el usuario en Firestore.');
    }
  }

  private async subirImagen(path: string, imagen: File): Promise<string> {
    try {
      const storageRef = ref(getStorage(), path);
      await uploadBytes(storageRef,imagen);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('Error, no se pudo subir la imagen.');
    }
  }

  public crearMensajeError(errorCode: string): string {
    let mensajeTipoError: string;
    switch (errorCode) {
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
        console.log('Código de error no manejado:', errorCode);
        break;
    }
    return mensajeTipoError;
  }
}
