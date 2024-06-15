import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, Timestamp, DocumentSnapshot, SnapshotOptions, setDoc, doc, query, getDocs, getDoc, updateDoc, where, QueryConstraint } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, updateProfile, sendEmailVerification } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Usuario } from '../auth/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async registro(usuario: Usuario) {
    try {
      const crearUsuario = createUserWithEmailAndPassword(
        this.auth,
        usuario.email,
        usuario.password
      );
      this.guardarFirebase(usuario,'usuarios');

    } catch {}
  }

  private guardarFirebase(data: any, path: string) {
    const col = collection(this.firestore, path);
    addDoc(col, data);
  }
}
