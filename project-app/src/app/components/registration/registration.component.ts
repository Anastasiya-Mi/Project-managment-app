
// export class RegistrationComponent implements OnInit {
//   myForm : FormGroup;
//   constructor(private authService: AuthService,
//     private toast: HotToastService,) {
//     this.myForm  = new FormGroup({
//       "password": new FormControl("",[
//         Validators.required,
//         Validators.pattern("^[A-Za-z0-9]{6,16}$")
//   ]),
//       "email": new FormControl("", [
//                   Validators.required,
//                   Validators.pattern(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`)
//       ]),
//       "name": new FormControl('', Validators.required),
//       "confirmPassword": new FormControl('', Validators.required),

//   });
//    }
//    get email() {
//     return this.myForm.get('email');
//   }

//   get password() {
//     return this.myForm.get('password');
//   }

//   get confirmPassword() {
//     return this.myForm.get('confirmPassword');
//   }

//   get name() {
//     return this.myForm.get('name');
//   }
//   ngOnInit() {
//   }
//   submit() {
//     // firebase.auth().createUser({
//     //   email: 'user@example.com',
//     //   emailVerified: false,
//     //   phoneNumber: '+11234567890',
//     //   password: 'secretPassword',
//     //   displayName: 'John Doe',
//     //   photoURL: 'http://www.example.com/12345678/photo.png',
//     //   disabled: false,
//     // })
//     // .then((userRecord) => {
//     //   // See the UserRecord reference doc for the contents of userRecord.
//     //   console.log('Successfully created new user:', userRecord.uid);
//     // })
//     // .catch((error) => {
//     //   console.log('Error creating new user:', error);
//     // });
//     // const { email, password } = this.myForm.value;
//     // // const email = form.value.email;
//     // // const password = form.value.password;
//     // if (!this.myForm.valid || !email || !password) {
//     //   return;
//     // }
//     // this.authService.signupUser(email, password)
//     // const email = form.value.email;
//     // const password = form.value.password;
//     // this.authService.signupUser(email, password);

//     const { name, email, password } = this.myForm.value;

//     if (!this.signUpForm.valid || !name || !password || !email) {
//       return;
//     }

//     this.authService
//       .signUp(email, password)
//       .pipe(
//         switchMap(({ user: { uid } }) =>
//           this.myForm.addUser({ uid, email, displayName: name })
//         ),
//         this.toast.observe({
//           success: 'Congrats! You are all signed up',
//           loading: 'Signing up...',
//           error: ({ message }) => `${message}`,
//         })
//       )
//       .subscribe(() => {
//         this.router.navigate(['/home']);
//       });
//   }
//   }

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../projects/projects-components/services/user.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: name })
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/projects']);
      });
  }
}
