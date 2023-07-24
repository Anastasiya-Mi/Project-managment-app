import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../User';
import { ProjectService } from '../services/services.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent {
  personalList!:Observable<User[]>

  constructor(private projectService:ProjectService ){}
ngOnInit() : void{
  this.personalList = this.projectService.getPersonalList()
}
}
