import { Component,EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../User';
import { Boards,BoardList,Task} from '../../Boards';
import { ProjectService } from '../services/services.service';
import {Route, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogResult } from '../dialog/dialog.component';
import { ConfirmWindowComponent,DialogResultWindow } from '../confirm-window/confirm-window.component';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent {
  personalList!:Observable<User[]>;
  
  board: Boards | null = null;
  todo: Boards[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
      condition: true,
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
      condition: true
    }
  ];
  constructor(private projectService:ProjectService, private router:Router,private dialog: MatDialog ){}
  redirectTo(board:Boards){
    console.log(board)
    this.projectService.setData(board);
    this.router.navigate(['projects/title'])
  }
  
  
  
  
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
        // console.log(this.todo)     
      });
  }
  

  edit(event:any,board:Boards): void{
    // console.log('edit', event.target)
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        board:{
          condition:true
        }
        
      },
    });
    // console.log(this.todo);
    dialogRef
      .afterClosed()
      .subscribe((result: DialogResult | undefined) => {
        const resultId = result?.board?.id;
        let value = result?.board.condition;
        let checkTitle = result?.board.title;
        let checkDescription = result?.board.description;
        console.log(result)
        if (!checkTitle && !checkDescription) {
          value = false;
          // this.store.collection('list').doc(resultId).delete();
      }
        if (!result) {
          return;
        }
        value = true;
        const dataList = this.todo;
        console.log(dataList)
        const taskIndex = dataList.indexOf(board);
        console.log(taskIndex,'taskIndex')
        if (result.delete) {
          dataList.splice(taskIndex, 1);
        } else {
          console.log(board,'board')
          console.log(result.board,'result')
          dataList[taskIndex] = result.board;
        }
      });
  }

  remove(event:any,board:Boards){
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {
        // board:{
        //   condition:true
        // }
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        const valueCondition = result?.condition;
        // const resultId = result?.board?.id;
        // console.log(result?.board?.id, 'task');
        console.log(result)
        if (!valueCondition) {
          console.log(valueCondition)
          const dataList = this.todo;
          const taskIndex = dataList.indexOf(board);
          dataList.splice(taskIndex, 1);
        } else{
          console.log(valueCondition)
        //   const dataList = this.todo;
        // console.log(result)
        // const taskIndex = dataList.indexOf(board);
        // dataList.splice(taskIndex, 1);
        // console.log(taskIndex,'taskIndex')
        }

        // const dataList = this.todo;
        // console.log(result)
        // const taskIndex = dataList.indexOf(board);
        // dataList.splice(taskIndex, 1);
        // console.log(taskIndex,'taskIndex')
        // console.log(valueCondition,'result')

        // if (result) {
        //   dataList.splice(taskIndex, 1);
        // } else {
          // console.log(board,'board')
          // console.log(result.board,'result')
          // dataList[taskIndex] = board;
        // }
        console.log(this.todo)
      });
  }


ngOnInit() : void{
  this.personalList = this.projectService.getPersonalList();
  
}
}
