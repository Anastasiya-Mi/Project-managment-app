import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


// export class LoginComponent implements OnInit {
//   myForm : FormGroup;

//   constructor(private authService: AuthService,
//     private router: Router,
//     // private fb: NonNullableFormBuilder
   
//     private toast: HotToastService,
    
//     private fb: NonNullableFormBuilder
//     ) {
//     this.myForm  = new FormGroup({
//       "password": new FormControl("",[
//         Validators.required,
//         Validators.pattern("^[A-Za-z0-9]{3,16}$")
//   ]),
//       "email": new FormControl("", [
//                   Validators.required,
//                   Validators.pattern(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`)
//       ]),

//   });
//    }

//   ngOnInit() {
//   }

//   // onSignin() {
//   //   const { email, password } = this.myForm.value;
//   //   // const email = form.value.email;
//   //   // const password = form.value.password;
//   //   if (!this.myForm.valid || !email || !password) {
//   //     return;
//   //   }
//   //   this.authService.signinUser(email, password)
//   //   // .pipe(
//   //   //   this.toast.observe({
//   //   //     success: 'Logged in successfully',
//   //   //     loading: 'Logging in...',
//   //   //     error: ({ message }) => `There was an error: ${message} `,
//   //   //   })
//   //   // )
//   //   // .subscribe(() => {
//   //   //   this.router.navigate(['/home']);
//   //   // });
//   // }
//   get email() {
//     return this.myForm.get('email');
//   }

//   get password() {
//     return this.myForm.get('password');
//   }

//  submit() {
//     const { email, password } = this.myForm.value;

//     if (!this.myForm.valid || !email || !password) {
//       return;
//     }

//     this.authService
//       .login(email, password)
//       .pipe(
//         this.toast.observe({
//           success: 'Logged in successfully',
//           loading: 'Logging in...',
//           error: ({ message }) => `There was an error: ${message} `,
//         })
//       )
//       .subscribe(() => {
//         this.router.navigate(['/projects']);
//       });

// }
// }

export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/projects']);
      });
  }
}