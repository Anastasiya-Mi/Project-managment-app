import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-header-board',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponentBoard {
constructor(private authService: AuthService,
  private router: Router){

}

logout(){
  this.authService.logout()
}


redirectTo(){
  this.router.navigate(['projects/profile']);
}
}
