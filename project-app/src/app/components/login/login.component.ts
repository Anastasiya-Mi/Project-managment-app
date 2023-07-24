import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Route, Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm!: FormGroup
constructor(private authService: AuthService,
  private router:Router){

}
  ngOnInit():void {
    this.loginForm = new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    });
    if(!this.authService.isLoggedIn()){
      console.log(this.authService.isLoggedIn())
      this.router.navigate(['projects'])
    }
  }

submitLogin(){
this.authService.login(this.loginForm.value).subscribe({
next:()=> this.router.navigate(['projects']),
error:(error) => alert(error.message)
})
  }
}
