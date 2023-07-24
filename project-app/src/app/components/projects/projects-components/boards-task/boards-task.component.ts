import { Component } from '@angular/core';
import { Observable } from 'rxjs';
// import { Subscribe } from 'rxjs';
import { User } from '../../User';
import { ActivatedRoute,Params  } from '@angular/router';
import { ProjectService } from '../services/services.service';

@Component({
  selector: 'app-boards-task',
  templateUrl: './boards-task.component.html',
  styleUrls: ['./boards-task.component.css']
})
export class BoardsTaskComponent {
id!: string;
user!:Observable<User>

constructor(private activateRoute:ActivatedRoute, private projectService:ProjectService){}

ngOnInit():void{
  this.activateRoute.params.subscribe((params:Params)=>this.id = params?.['id']);
  this.user = this.projectService.getPerson(this.id)
  // console.log(this.id)
}
}
