import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, Timestamp, DocumentSnapshot, SnapshotOptions, setDoc, doc, query, getDocs, getDoc, updateDoc, where, QueryConstraint } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, updateProfile, sendEmailVerification } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  

}
