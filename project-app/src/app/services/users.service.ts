import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { Boards } from '../models/boards';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import {
  collection,
  doc,
  docData,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  query
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, deleteUser } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private store: AngularFirestore,
    private toast: HotToastService,
    private router: Router
  ) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }
  
  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }
  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }


  deleteUserAccount() {
    const auth = getAuth();
    const user = auth.currentUser;
    user?.delete().then;
    this.toast.observe({
      loading: 'Saving profile data...',
      success: 'Successfully deleted user',
      error: ({ message }) => `${message}`,
    });
    this.router.navigate(['']);
  }

  removeUser(user: ProfileUser) {
    this.store.collection('users').doc(user.uid).delete();
  }
}
