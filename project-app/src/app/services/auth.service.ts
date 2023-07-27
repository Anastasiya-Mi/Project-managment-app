import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {HttpClient} from '@angular/common/http';
import { User } from '../../app/components/projects/User';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})

// const apiKey = 'AIzaSyCLAB-pyc0YbChlrP1FL8sqBMquOEcwawA';
export class AuthService {
  token!: string;
  // private apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;
// email!:string
// password!:string
  constructor(private router:Router,
    private fireauth : AngularFireAuth,
    // private http: HttpClient
    ) { }
    signupUser(email: string, password: string) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
            alert('Registration Successful');
        //     // this.sendEmailForVerification(res.user);
            this.router.navigate(['/login'])})
        .catch(
        error => console.log(error)
        )
    }
  
    signinUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
        response =>{
           console.log(response);
           firebase.auth().currentUser?.getIdToken()
           .then(
             (token: string) => this.token = token
           )
           this.getToken();
           this.router.navigate(['/projects']);
          
  
        }
        )
        .catch(
        error => console.log(error)
        );
   }
  
    getToken() {
      firebase.auth().currentUser?.getIdToken() 
      .then(
        (token: string) => {
          this.token = token;
          console.log(this.token);
        }
        )
        console.log('This is toke');
        console.log(this.token);
          return this.token;
      // this is async activity to check if the token is valid or expired. if expired new token will be issued.
    }
  
    isAuthenticated() {
      return this.token != null;
    }
  
    logout() {
      firebase.auth().signOut();
        this.token = '';
        this.router.navigate(['']);
    }
  // signIn(signIn: User) {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}signin`, {
  //     'email': signIn.email,
  //     'password': signIn.password,
  //   })
  // }

  // registration(signUp: User) {
  //   return this.http.post<User>(`${this.apiUrl}signup`, {
  //     // "name": signUp.name,
  //     "email": signUp.email,
  //     "password": signUp.password
  //   })
  // }
  // setToken(token: string){
  //   localStorage.setItem('token',token)
  // }

  // getToken(){
  //   localStorage.getItem('token')
  // }

  // isLoggedIn(){
  //   return this.getToken() !== null;
    

  // }

  // login(userInfo:{email:string,password:string}): Observable<string | boolean>{
  // // const email =this.userInfo.email;
  // // const password =this.userInfo.password;
  // // console.log(email,password,'login')
  //   if(userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123'){
  //     this.setToken('true')
  //     return of (true)
  //   }
  //   return throwError(() => new Error('Failed login'))
  // }

  // registration(email : string, password : string) {

  //   this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
  //     alert('Registration Successful');
  //     // this.sendEmailForVerification(res.user);
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/registration']);
  //   })
  // }


  // login(email : string, password : string) {
  //   this.fireauth.signInWithEmailAndPassword(email,password).then( ()=> {
  //       localStorage.setItem('token','true');

  //       this.router.navigate(['projects']);
  //       // if(res.user?.emailVerified == true) {
  //       //   this.router.navigate(['/dashboard']);
  //       // } else {
  //       //   this.router.navigate(['/varify-email']);
  //       // }

  //   }, err => {
  //       alert(err.message);
  //       this.router.navigate(['/login']);
  //   })
  // }

  // logout() {
  //   this.fireauth.signOut().then( () => {
  //     localStorage.removeItem('token');
  //     // this.router.navigate(['/login']);
  //     this.router.navigate(['']);
  //   }, err => {
  //     alert(err.message);
  //   })
  // }
  // logout(){
  //   this.router.navigate([''])
  // }
}
