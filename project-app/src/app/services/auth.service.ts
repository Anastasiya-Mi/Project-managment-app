import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
email!:string
password!:string
  constructor(private router:Router,
    // private fireauth : AngularFireAuth
    ) { }

  setToken(token: string){
    localStorage.setItem('token',token)
  }

  getToken(){
    localStorage.getItem('token')
  }

  isLoggedIn(){
    return this.getToken() !== null;
    

  }

  login(userInfo:{email:string,password:string}): Observable<string | boolean>{
  // const email =this.userInfo.email;
  // const password =this.userInfo.password;
  // console.log(email,password,'login')
    if(userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123'){
      this.setToken('true')
      return of (true)
    }
    return throwError(() => new Error('Failed login'))
  }
  // login(email:string,password:string): Observable<string | boolean>{
    // const email =this.userInfo.email;
    // const password =this.userInfo.password;
    // console.log(email,password,'login')
    // console.log( this.fireauth.signInWithEmailAndPassword(email,password))
    // this.fireauth.signInWithEmailAndPassword(email,password).then( ()=> {
    //   localStorage.setItem('token','true')
    //   return of (true)})
      // if(userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123'){
      //   this.setToken('true')
      //   return of (true)
      // }
    //   return throwError(() => new Error('Failed login'))
    // }
  logout(){
    this.router.navigate([''])
  }
}
