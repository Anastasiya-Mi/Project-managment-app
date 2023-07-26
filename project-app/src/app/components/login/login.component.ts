import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Route, Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// export class LoginComponent {
//   loginForm!: FormGroup
// constructor(private authService: AuthService,
//   private router:Router){

// }
//   ngOnInit():void {
//     this.loginForm = new FormGroup({
//       'email': new FormControl('',[Validators.required,Validators.email]),
//       'password': new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
//     });
//     if(!this.authService.isLoggedIn()){
//       console.log(this.authService.isLoggedIn())
//       this.router.navigate(['projects'])
//     }
//   }

// submitLogin(){
//   // const email =this.loginForm.value.email;
//   // const password =this.loginForm.value.password;
//   // console.log(email,password)
// this.authService.login(this.loginForm.value).subscribe({
// next:()=> this.router.navigate(['projects']),
// error:(error) => alert(error.message)
// })
// this.authService.login(email,password).subscribe({
//   next:()=> this.router.navigate(['projects']),
//   error:(error) => alert(error.message)
//   })
//   }
// }
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';

  }

}