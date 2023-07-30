import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection,  doc,
  docData,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  where,
  query,
  orderBy,
  onSnapshot,
  } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { Boards } from '../models/boards';
import { Observable ,take,concatMap,map,switchMap,of} from 'rxjs';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent,DialogResult } from '../components/dialog/dialog.component';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private firestore: Firestore,
    private usersService: UsersService,
    private dialog: MatDialog,
    private store: AngularFirestore
  ) {}
 
  setData(data: any) {
    const value = JSON.stringify(data);
    localStorage.setItem('data', value);
  }

  getData() {
    return JSON.parse(localStorage.getItem('data') || '{}');
  }
}

