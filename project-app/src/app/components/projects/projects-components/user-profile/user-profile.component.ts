import { Component,Injectable  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(private authService: AuthService,
    private router: Router,
    // private fb: NonNullableFormBuilder
    ){}

}
