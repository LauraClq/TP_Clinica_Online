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

  async registro(usuario: any, path: string) {
    try {
      const crearUsuario = createUserWithEmailAndPassword(
        this.auth,
        usuario.email,
        usuario.password
      );
      const urlPerfil1 = this.subirImagen(path, usuario.imagen);
      const urlPerfil2 = this.subirImagen(path, usuario.imagen_dos);

      const unPaciente = {
        ...usuario,
        imagen: urlPerfil1,
        imagen_dos: urlPerfil2,
      };

      // Elimino la contraseña antes de guardar en Firebase
      const { password, ...paciente } = usuario;
      this.guardarUsuario(paciente, 'usuarios');
    } catch(error){
      throw error;
    }
  }

  //Agregar un usuario en una collecion
  private guardarUsuario(data: any, path: string) {
    const col = collection(this.firestore, path);
    addDoc(col, data);
  }

  //Subir Imagenes
  async subirImagen(path: string, url: string) {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadString(storageRef, url, 'data_url');
    return getDownloadURL(storageRef);
  }
}
