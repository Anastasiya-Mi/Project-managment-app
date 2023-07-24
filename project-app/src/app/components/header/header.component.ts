import { Component } from '@angular/core';
import {Route, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService:AuthService){

  }
  
  logout(){
    this.authService.logout()
  }
//  checkStatus(){
//   console.log(!this.authService.isLoggedIn())
//   return !this.authService.isLoggedIn();
//  }

}