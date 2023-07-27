import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Route, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';

// import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  myForm : FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    // private fb: NonNullableFormBuilder
    ) {
    this.myForm  = new FormGroup({
      "password": new FormControl("",[
        Validators.required,
        Validators.pattern("^[A-Za-z0-9]{3,16}$")
  ]),
      "email": new FormControl("", [
                  Validators.required,
                  Validators.pattern(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`)
      ]),

  });
   }

  ngOnInit() {
  }

  // onSignin() {
  //   const { email, password } = this.myForm.value;
  //   // const email = form.value.email;
  //   // const password = form.value.password;
  //   if (!this.myForm.valid || !email || !password) {
  //     return;
  //   }
  //   this.authService.signinUser(email, password)
  //   // .pipe(
  //   //   this.toast.observe({
  //   //     success: 'Logged in successfully',
  //   //     loading: 'Logging in...',
  //   //     error: ({ message }) => `There was an error: ${message} `,
  //   //   })
  //   // )
  //   // .subscribe(() => {
  //   //   this.router.navigate(['/home']);
  //   // });
  // }

 submit() {
    const { email, password } = this.myForm.value;

    if (!this.myForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      // .pipe(
      //   this.toast.observe({
      //     success: 'Logged in successfully',
      //     loading: 'Logging in...',
      //     error: ({ message }) => `There was an error: ${message} `,
      //   })
      // )
      .subscribe(() => {
        this.router.navigate(['/projects']);
      });

}
}
