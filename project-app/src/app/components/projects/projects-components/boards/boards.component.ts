import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../User';
import { Boards,BoardList,Task} from '../../Boards';
import { ProjectService } from '../services/services.service';
import {Route, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogResult } from '../dialog/dialog.component';
import { ConfirmWindowComponent } from '../confirm-window/confirm-window.component';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent {
  personalList!:Observable<User[]>;
  // boards!:Observable<Boards[]>;
  todo: Boards[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];
  constructor(private projectService:ProjectService, private router:Router,private dialog: MatDialog ){}
  newBoard() :void{
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        board: {
          condition: true,
        },
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DialogResult | undefined) => {
        let value = result?.board.condition;
        // const valueId = JSON.stringify(result?.task.id);
        const checkTitle = result?.board.title;
        const checkDescription = result?.board.description;
        if (!checkTitle && !checkDescription) {
          value = false;
        }
        if (!result || !value) {
          return;
        }

        this.todo.push(result.board);        
      });
  }
  redirectTo(){
    console.log('ggg')
    this.router.navigate(['user/:id'])
  }
  edit(event:any): void{
    console.log('edit')
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        board:{}
      },
    });
    console.log(this.todo);
    dialogRef
      .afterClosed()
      .subscribe((result: DialogResult | undefined) => {
        const resultId = result?.board?.id;
        let value = result?.board.condition;
        const checkTitle = result?.board.title;
        const checkDescription = result?.board.description;
        if (!checkTitle && !checkDescription) {
          value = false;
          // this.store.collection('list').doc(resultId).delete();
      }
        if (!result) {
          return;
        }
        value = true;
      });
  }

  remove(event:any){
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {
        board:{}
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: ConfirmWindowComponent | undefined) => {
        const valueCondition = result?.board?.condition;
        const resultId = result?.board?.id;
        console.log(result?.board?.id, 'task');
        if (valueCondition) {
          return;
        }

        // this.store.collection('list').doc(resultId).delete();
      });
  }


ngOnInit() : void{
  this.personalList = this.projectService.getPersonalList();
  
}
}
