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
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent {
  personalList!:Observable<User[]>;

  constructor(private projectService:ProjectService, 
    private router:Router,
    private dialog: MatDialog ,
    private store: AngularFirestore){}

  redirectTo(board:Boards){
    console.log(board)
    this.projectService.setData(board);
    this.router.navigate(['projects/title'])
  }

  boards = this.store.collection('boards').valueChanges({idField: 'id'}) as Observable<Boards[]>;
  
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
        const checkTitle = result?.board.title;
        const checkDescription = result?.board.description;
        if (!checkTitle && !checkDescription) {
          value = false;
        }
        if (!result || !value) {
          return;
        }
        this.store.collection('boards').add(result.board);          
      });
  }
  

  edit(event:any,board:Boards): void{
    console.log('edit',board )
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        board:{          
        }        
      },
    });   
    dialogRef
      .afterClosed()
      .subscribe((result: DialogResult | undefined) => {
        const resultId = board.id;       
        let checkTitle = result?.board.title;
        let checkDescription = result?.board.description;   
      
        if (!checkTitle && !checkDescription) {          
          return
      }
      
        if (!result) {
          return;
        }

        board.title = checkTitle;
        board.description = checkDescription;        
       
        this.store.collection('boards').doc(resultId).set(board);       
      });
  }

  remove(event:any,board:Boards){
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {        
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        const valueCondition = result?.condition;
        const resultId = board.id;      
          if (!valueCondition) 
          this.store.collection('boards').doc(resultId).delete();          
      });
  }


ngOnInit() : void{
  this.personalList = this.projectService.getPersonalList();
  
}
}
