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
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent {
  user$ = this.usersService.currentUserProfile$;
  boardList = this.boardService
    .currentUserProfileBoardList()
    .valueChanges({ idField: 'id' }) as Observable<BoardList[]>;
  data$ = this.boardService.currentUserProfileBoardListColumnData$;
  columnsList = this.boardService
    .currentUserProfileBoardListData()
    .valueChanges({ idField: 'id' }) as Observable<BoardList[]>;
  data: any;
  columns: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private usersService: UsersService
  ) {
    this.data = this.boardService.getData();
  }

  edit(event: any, column: BoardList, user: ProfileUser) {
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
        console.log(result);
        const dataId = this.data.id;
        const columnId = column.id;
        const checkTitle = result?.column.title;
        if (!checkTitle || !result) {
          return;
        }
        this.store
          .collection('users')
          .doc(user.uid)
          .collection('boards')
          .doc(dataId)
          .collection('columns')
          .doc(columnId)
          .update(result.column);
      });
  }

  remove(event: any, column: BoardList, user: ProfileUser) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {},
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        const valueCondition = result?.condition;
        const dataId = this.data.id;
        const columnId = column.id;
        if (!valueCondition) {
          this.store
            .collection('users')
            .doc(user.uid)
            .collection('boards')
            .doc(dataId)
            .collection('columns')
            .doc(columnId)
            .delete();
        }
      });
  }

  addTask(column: BoardList, user: ProfileUser) {
    console.log(column);

    const dialogRef = this.dialog.open(DialogTaskComponent, {
      height: '400px',
      width: '400px',
      data: {},
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DialogTaskResult | undefined) => {
        const task = result?.task;
        const dataId = this.data.id;
        const columnId = column.id;
        console.log(task);
        // const dataId = this.data.id;
        if (!task) {
          return;
        }
        // column?.tasks.push(task);
        if (!column.tasks && typeof task === 'string') {
          column.tasks = [];
          column.tasks.push(task);
        } else if (typeof task === 'string') {
          column?.tasks?.push(task);
        }
        // column.tasks?.push(task);
        // column.tasks =this.tasks
        // console.log(column, dataId);

        // const dataList = this.columns;
        // const taskIndex = dataList.indexOf(column);
        // const value =dataList[taskIndex];
        // console.log(value)
        // dataList.splice(taskIndex, 1,value);
        console.log(column);
        this.store
          .collection('users')
          .doc(user.uid)
          .collection('boards')
          .doc(dataId)
          .collection('columns')
          .doc(columnId)
          .set(column);
        // this.data.columns = dataList;
        // console.log(this.data);
        // this.store.collection('boards').doc(dataId).set(this.data);
      });
  }
  // addTask(column: BoardList){
  editTask(event: any, column: BoardList, user: ProfileUser, task: Task) {
    console.log('edit', column.tasks, task);
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      height: '400px',
      width: '400px',
      data: {
        column: {
          condition: true,
        },
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogTaskResult | undefined) => {
        const checkResult = result?.task;
        const dataId = this.data.id;
        const columnId = column.id;
        if (!result) {
          return;
        }

        if (typeof checkResult === 'string') {
          const dataList = column.tasks;
          if (dataList) {
            const taskIndex = dataList.findIndex((item) => item === task);
            dataList.splice(taskIndex, 1, checkResult);
            }
            console.log(column);
            console.log(this.data);
            this.store
          .collection('users')
          .doc(user.uid)
          .collection('boards')
          .doc(dataId)
          .collection('columns')
          .doc(columnId)
          .update(column);
      };
          })
          };
        // }
      // });
  // }
  removeTask(event: any, column: BoardList, user: ProfileUser, task: Task) {
    event.stopPropagation();
      const dialogRef = this.dialog.open(ConfirmWindowComponent, {
        height: '100px',
        width: '200px',
        data: {},
      });

      dialogRef
        .afterClosed()
        .subscribe((result: DialogResultWindow | undefined) => {
          // const dataId = this.data.id;
          const valueCondition = result?.condition;
          const dataId = this.data.id;
          const columnId = column.id;

          if (!valueCondition) {
            const dataList = column.tasks;
            console.log(dataList);
            if (dataList) {
              const taskIndex = dataList.findIndex((item) => item === task);
              dataList.splice(taskIndex, 1);
            }
            console.log(column);
            console.log(this.data);
            this.store
          .collection('users')
          .doc(user.uid)
          .collection('boards')
          .doc(dataId)
          .collection('columns')
          .doc(columnId)
          .update(column);
          }
        });
  }
  // }
  // )}
}
