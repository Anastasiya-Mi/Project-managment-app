import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
email!:string
password!:string
  constructor(private router:Router,
    private fireauth : AngularFireAuth
    ) { }

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

  registration(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      // this.sendEmailForVerification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/registration']);
    })
  }
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( ()=> {
        localStorage.setItem('token','true');

        this.router.navigate(['projects']);
        // if(res.user?.emailVerified == true) {
        //   this.router.navigate(['/dashboard']);
        // } else {
        //   this.router.navigate(['/varify-email']);
        // }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      // this.router.navigate(['/login']);
      this.router.navigate(['']);
    }, err => {
      alert(err.message);
    })
  }
  // logout(){
  //   this.router.navigate([''])
  // }
}
