import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
// import { Subscribe } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Boards, BoardList, Task } from '../../models/boards';
import {
  ConfirmWindowComponent,
  DialogResultWindow,
} from '../confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
import { DialogColumnComponent } from '../dialog-column/dialog-column.component';
import { DialogColumnResult } from '../dialog-column/dialog-column.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
import { DialogTaskResult } from '../dialog-task/dialog-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';

@Component({
  selector: 'app-boards-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.css'],
})


// const getObservable = (collection: AngularFirestoreCollection<Task>) => {
//   const subject = new BehaviorSubject<BoardList[]>([]);
//   collection.valueChanges({ idField: 'id' }).subscribe((val: BoardList[]) => {
//     subject.next(val);
//   });
//   return subject;
// };

export class BoardTaskComponent {
  // data!: any;

  boardListStatus = this.boardService.currentUserProfileBoardListColumnStatus()
  id!: any;
  data!:any;
  // columns!: any;
  tasks!: any;
  user$ = this.usersService.currentUserProfile$;
  boardList = this.boardService.currentUserProfileBoardList()
  .valueChanges({ idField: 'id' }) as Observable<Boards[]>;
  // columns = this.boardService.getData().valueChanges({ idField: 'id' }) as Observable<Boards[]>;
  // columns = this.data.columns || []
  constructor(
    private activateRoute: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private usersService: UsersService
  ) {
    this.data = this.boardService.getData();
    // console.log(this.data)
    // this.columns = this.data.columns || [];
    // this.tasks = this.data.columns.tasks || []
  }
  // columns = this.store.collection('boards') as Observable<Boards[]>;
  // data:this.projectService.getData();

  // columnsData = this.store.collection('boards').doc(this.data).valueChanges({columns: 'columns'}) as Observable<BoardList[]>;
  // column = this.columnsData.columns
  ngOnInit(): void {
    // this.data = this.projectService.getData();
    // this.columns = this.data.columns || []
  }
  newColumn(user:ProfileUser) {
    console.log(this.data);
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
        const dataId = this.data.id;
        const dataTitle = this.data.title;
        const dataDescription = this.data.description;
        console.log(dataId,result)
        let value = result?.column.condition;
        const data = result?.column;
        const checkTitle = result?.column.title;
        const checkDescription = result?.column.description;
        if (!checkTitle && !checkDescription) {
          value = false;
        }
        if (!result || !value) {
          return;
        }

        this.store.collection('users').doc(user.uid).collection('boards')
        .doc(dataId).collection('columns').add(result.column)

        })
        // this.boardService.currentUserProfileBoardList().add({

        // })
        // const dataList = this.columns;
        // dataList.push(result?.column);
        // this.data.columns = dataList;
        // console.log(this.data);
        // this.store.collection('users').doc(user.uid).collection('boards').doc(dataId).update(this.data);
        // this.columns = this.data.columns;
      // });
    // console.log(this.columns);
  }
  // edit(event: any, column: BoardList) {
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(DialogColumnComponent, {
  //     height: '400px',
  //     width: '600px',
  //     data: {
  //       column: {
  //         condition: true,
  //       },
  //     },
  //   });
  //   dialogRef
  //     .afterClosed()
  //     .subscribe((result: DialogColumnResult | undefined) => {
  //       console.log(result, column);
  //       // const dataId = this.data.id;
  //       const checkTitle = result?.column.title;
  //       const currentTitle = column.title;
  //       if (!checkTitle || !result) {
  //         return;
  //       }
  //       const dataList = this.columns;
  //       // const taskIndex = dataList.indexOf(column);
  //       // dataList.splice(taskIndex, 1,result?.column);
  //       // this.data.columns = dataList;
  //       // this.store.collection('boards').doc(dataId.columns).set(this.data);
  //     });
  // }
  // remove(event: any, column: BoardList) {
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(ConfirmWindowComponent, {
  //     height: '100px',
  //     width: '200px',
  //     data: {},
  //   });
  //   dialogRef
  //     .afterClosed()
  //     .subscribe((result: DialogResultWindow | undefined) => {
  //       const valueCondition = result?.condition;
  //       // const dataId = this.data.id;
  //       console.log(result);
  //       if (!valueCondition) {
  //         // console.log(valueCondition)
  //         const dataList = this.columns;
  //         // const taskIndex = dataList.indexOf(column);
  //         // dataList.splice(taskIndex, 1);
  //         // console.log(dataList)
  //         // this.data.columns = dataList;
  //         // console.log(this.data.columns)
  //         // this.store.collection('boards').doc(dataId).set(this.data);
  //         // console.log(this.data.columns);
  //       }
  //     });
  // }
  // addTask(column: BoardList) {
  //   console.log(column);

  //   const dialogRef = this.dialog.open(DialogTaskComponent, {
  //     height: '400px',
  //     width: '600px',
  //     data: {},
  //   });
  //   dialogRef
  //     .afterClosed()
  //     .subscribe((result: DialogTaskResult | undefined) => {
  //       const task = result?.task;
  //       console.log(task);
  //       // const dataId = this.data.id;
  //       if (!task) {
  //         return;
  //       }
  //       // column?.tasks.push(task);
  //       if (!column.tasks && typeof task === 'string') {
  //         column.tasks = [];
  //         column.tasks.push(task);
  //       } else {
  //         column?.tasks?.push(task);
  //       }
  //       // column.tasks?.push(task);
  //       // column.tasks =this.tasks
  //       // console.log(column, dataId);

  //       const dataList = this.columns;
  //       // const taskIndex = dataList.indexOf(column);
  //       // const value =dataList[taskIndex];
  //       // console.log(value)
  //       // dataList.splice(taskIndex, 1,value);
  //       console.log(dataList);
  //       // this.data.columns = dataList;
  //       // console.log(this.data);
  //       // this.store.collection('boards').doc(dataId).set(this.data);
  //     });
  // }

  // editTask(event: any, task: Task, column: BoardList) {
  //   console.log('edit', column.tasks, task);
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(DialogTaskComponent, {
  //     height: '400px',
  //     width: '600px',
  //     data: {
  //       column: {
  //         condition: true,
  //       },
  //     },
  //   });

  //   dialogRef
  //     .afterClosed()
  //     .subscribe((result: DialogTaskResult | undefined) => {
  //       const checkResult = result?.task;
  //       // const dataId = this.data.id;
  //       if (!result) {
  //         return;
  //       }

  //       if (typeof checkResult === 'string') {
  //         const dataList = column.tasks;
  //         if (dataList) {
  //           const taskIndex = dataList.findIndex((item) => item === task);
  //           dataList.splice(taskIndex, 1, checkResult);
  //         }
  //         console.log(dataList);
  //         // console.log(this.data);
  //         // this.store.collection('boards').doc(dataId).set(this.data);
  //       }
  //     });
  // }

  // removeTask(event: any, task: Task, column: BoardList) {
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(ConfirmWindowComponent, {
  //     height: '100px',
  //     width: '200px',
  //     data: {},
  //   });

  //   dialogRef
  //     .afterClosed()
  //     .subscribe((result: DialogResultWindow | undefined) => {
  //       // const dataId = this.data.id;
  //       const valueCondition = result?.condition;

  //       if (!valueCondition) {
  //         const dataList = column.tasks;
  //         console.log(dataList);
  //         if (dataList) {
  //           const taskIndex = dataList.findIndex((item) => item === task);
  //           dataList.splice(taskIndex, 1);
  //         }
  //         console.log(dataList);
  //         // console.log(this.data);
  //         // this.store.collection('boards').doc(dataId).set(this.data);
  //       }
  //     });
  // }
}
