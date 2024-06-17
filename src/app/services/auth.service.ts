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
      const crearUsuario = createUserWithEmailAndPassword(
        this.auth,
        usuario.email,
        usuario.password
      );
       const path = `usuarios/${usuario.dni}/`;
       const urlPerfil1 = await this.subirImagen(`${path}_perfil1`,usuario.imagen);

       let data: any = {
         ...usuario,
         imagen: urlPerfil1,
       };

       // Si es un Paciente, subimos la segunda imagen
       if ('imagen_dos' in usuario) {
         const urlPerfil2 = await this.subirImagen(`${path}_perfil2`,usuario.imagen_dos);
         data.imagen_dos = urlPerfil2;
       }


      // Elimino la contraseña antes de guardar en Firebase
      const { password, ...paciente } = usuario;
      this.guardarUsuario(paciente, 'usuarios');
    } catch (error) {
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
