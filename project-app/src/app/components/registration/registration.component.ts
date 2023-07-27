import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myForm : FormGroup;
  constructor(private authService: AuthService) {
    this.myForm  = new FormGroup({
      "password": new FormControl("",[
        Validators.required,
        Validators.pattern("^[A-Za-z0-9]{6,16}$")
  ]),
      "email": new FormControl("", [
                  Validators.required,
                  Validators.pattern(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`)
      ]),

  });
   }

  ngOnInit() {
  }
  onSignup() {
    const { email, password } = this.myForm.value;
    // const email = form.value.email;
    // const password = form.value.password;
    if (!this.myForm.valid || !email || !password) {
      return;
    }
    this.authService.signupUser(email, password)
    // const email = form.value.email;
    // const password = form.value.password;
    // this.authService.signupUser(email, password);
  }



}
