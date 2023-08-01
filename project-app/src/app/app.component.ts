import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
user$ = this.usersService.currentUserProfile$;
  constructor(
    private authService: AuthService,
    private router: Router ,
    private usersService: UsersService,
    ){

  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
