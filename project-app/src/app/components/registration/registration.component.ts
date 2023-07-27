import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }


  // email: string = '';
  // password: string = '';

  // constructor(private auth: AuthService) { }
  // ngOnInit(): void {
  // }

  // registration() {
  //   if (this.email == '') {
  //     alert('Please enter email');
  //     return;
  //   }
  //   if (this.password == '') {
  //     alert('Please enter password');
  //     return;
  //   }
  //   this.auth.registration(this.email, this.password);
  //   this.email = '';
  //   this.password = '';
  // }
  
}
