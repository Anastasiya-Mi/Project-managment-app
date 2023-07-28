
import { AuthService } from '../../../../services/auth.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../services/user.service';
@Component({
  selector: 'app-header-board',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponentBoard {
  user$ = this.usersService.currentUserProfile$;

  constructor(
    private authService: AuthService,
    public usersService: UsersService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

// redirectTo(){
//   this.router.navigate(['projects/profile']);
// }
}
