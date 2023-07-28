import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // updateProfile(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.auth.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
// userInfo.value = {
//   token: response.data.idToken,
//   email: response.data.email,
//   userId: response.data.localId,
//   refreshToken: response.data.refreshToken,
// }

// export class AuthService {
//   token!: string;
//   currentUser$ = authState(this.auth);
//   // auth = getAuth();
 

//   constructor(private router:Router,
//     private fireauth : AngularFireAuth,
//     private auth: Auth
//     ) { }

//     signupUser(email: string, password: string) {  

//       firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then(res => {
//         console.log(res)
//             alert('Registration Successful');
//             this.router.navigate(['/login'])})
//             // return from(createUserWithEmailAndPassword(this.auth, email, password));
//         .catch(
//         error => console.log(error)
//         )

//     }

//     signinUser(email: string, password: string) {
//       firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(
//         response =>{
//           console.log(response)
//            firebase.auth().currentUser?.getIdToken()
//            .then(
//              (token: string) => this.token = token

//            )

//            this.getToken();
//            this.router.navigate(['/projects']);


//         }
//         )
//         .catch(
//         error => console.log(error)
//         );
//    }
   
//    login(email: string, password: string): Observable<any> {
//     console.log(from(signInWithEmailAndPassword(this.auth, email, password)))
   
//     return from(signInWithEmailAndPassword(this.auth, email, password));
//   }
//     getToken() {
//       firebase.auth().currentUser?.getIdToken()
//       .then(
//         (token: string) => {
//           this.token = token;
//           console.log(this.token);
//         }
//         )
//         console.log('This is toke');
//         console.log(this.token);
//         this.router.navigate(['']);
//         // return this.token;
//       // this is async activity to check if the token is valid or expired. if expired new token will be issued.
//     }

//     isAuthenticated() {
//       return this.token != null;
//     }

//     logout() {
//       firebase.auth().signOut();
//         this.token = '';
//         this.router.navigate(['']);
//     }

// }

