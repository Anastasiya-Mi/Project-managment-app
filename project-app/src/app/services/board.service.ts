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
  collectionGroup
  } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { BoardList, Boards } from '../models/boards';
import { Observable ,take,concatMap,map,switchMap,of, from} from 'rxjs';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent,DialogResult } from '../components/dialog/dialog.component';
import { getAuth } from "firebase/auth";
import { AuthService } from '../services/auth.service';
import { DocumentReference } from '@google-cloud/firestore'

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private firestore: Firestore,
    private usersService: UsersService,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private authService: AuthService,
    // private firestore: Firestore,
  ) {}
  // : Observable<Boards[]>
  // : Observable<Boards | null> 
currentUserProfileBoardListStatus(){    
    const auth = getAuth();
    const userUid = auth.currentUser?.uid;
    const user = auth.currentUser;
    const result = this.store.collection('users').doc(user?.uid).collection('/boards', ref => ref.where('id', '!=',''));
    console.log(result,'result')
    return result;
  }
  currentUserProfileBoardList(){    
    const auth = getAuth();
    // const userUid = auth.currentUser?.uid;
    const user = auth.currentUser;
    return this.store.collection('users').doc(user?.uid).collection('boards')
  }

  currentUserProfileBoardListColumnStatus(){    
    const auth = getAuth();
    const userUid = auth.currentUser?.uid;
    const user = auth.currentUser;
    const result = this.store.collection('users').doc(user?.uid).collection('/boards', ref => ref.where('columns', '!=',''));
    console.log(result,'result')
    return result;
  }
  get currentUserProfileBoardListColumnData$() : Observable<Boards[] | null>{        
    const dataStorage = this.getData();    
      const boardId = dataStorage.id;   
      return this.authService.currentUser$.pipe(
        switchMap((user) => {
          if (!user?.uid) {
            return of(null);
          }
          const ref = collection(this.firestore, 'users', user?.uid,'boards',boardId,'columns');
          // const coll = ref.get()
          console.log(ref, 'ref')
          return collectionData(ref) as Observable<Boards[]>;
        })
      );
    }
  // }
    
    // const result = this.store.collection('users').doc(user?.uid).collection('boards').doc(boardId)
    // console.log(result,'result')
    // return result;
  


  setData(data: any) {
    const value = JSON.stringify(data);
    localStorage.setItem('data', value);
  }

  getData() {
    return JSON.parse(localStorage.getItem('data') || '{}');
  }
}

