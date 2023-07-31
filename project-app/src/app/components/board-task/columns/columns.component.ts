import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
// import { Subscribe } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { Boards, BoardList, Task } from '../../../models/boards';
import {
  ConfirmWindowComponent,
  DialogResultWindow,
} from '../../confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
import { DialogColumnComponent } from '../../dialog-column/dialog-column.component';
import { DialogColumnResult } from '../../dialog-column/dialog-column.component';
import { DialogTaskComponent } from '../../dialog-task/dialog-task.component';
import { DialogTaskResult } from '../../dialog-task/dialog-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent {
  user$ = this.usersService.currentUserProfile$;
  boardList = this.boardService.currentUserProfileBoardList()
  .valueChanges({ idField: 'id' }) as Observable<BoardList[]>;
  data$= this.boardService.currentUserProfileBoardListColumnData$;
data:any
columns:any

constructor(
  private activateRoute: ActivatedRoute,
  private boardService: BoardService,
  private dialog: MatDialog,
  private store: AngularFirestore,
  private usersService: UsersService
) {
  this.data = this.boardService.getData();
  // this.data = this.boardService.getData();
  // console.log(this.data)
  // if(this.data.columns){
    // this.columns = this.data.columns;
  }
  // this.columns = this.data.columns;
  // if(this.data.columns === undefined){
  //   this.data.columns = {};
  //   this.data.columns.title = '';
  //   this.columns = this.data.columns;
  // }
  // console.log(this.data.columns)
  // console.log(this.data.columns.title)
  // this.tasks = this.data.columns.tasks || []
// }


edit(event: any, column: BoardList,user:ProfileUser){
  console.log(column.id)
  event.stopPropagation();
    const dialogRef = this.dialog.open(DialogColumnComponent, {
      height: '400px',
      width: '600px',
      data: {
        column: {
          condition: true,
        },
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DialogColumnResult | undefined) => {
        console.log(result, column);
        const dataId = this.data.id;
        const columnId = this.columns.id;
        const checkTitle = result?.column.title;
        const currentTitle = column.title;
        if (!checkTitle || !result) {
          return;
        }
        const dataList = this.columns;
        // const taskIndex = dataList.indexOf(column);
        // dataList.splice(taskIndex, 1,result?.column);
        // this.data.columns = dataList;
        this.store.collection('users').doc(user.uid).collection('boards')
        .doc(dataId).collection('columns').add(result.column)
      });
}
// remove(event: any, column: BoardList){

// }
// addTask(column: BoardList){

// }
}