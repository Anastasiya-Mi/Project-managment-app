import { Component,Input,EventEmitter,Output } from '@angular/core';
import { Observable,map } from 'rxjs';
// import { Subscribe } from 'rxjs';
import { User } from '../../User';
import { ActivatedRoute,Params  } from '@angular/router';
import { ProjectService } from '../services/services.service';
import { Boards,BoardList,Task} from '../../Boards';
import { ConfirmWindowComponent,DialogResultWindow } from '../confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
import { DialogColumnComponent } from '../boards-task/dialog-column/dialog-column.component';
import { DialogColumnResult } from '../boards-task/dialog-column/dialog-column.component';
import { DialogTaskComponent } from '../boards-task/dialog-task/dialog-task.component';
import { DialogTaskResult } from '../boards-task/dialog-task/dialog-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-boards-task',
  templateUrl: './boards-task.component.html',
  styleUrls: ['./boards-task.component.css'],
})
export class BoardsTaskComponent {
  // count!: number;
  // id!: string;
  // user!: Observable<User>;
  data!: any;
  // columns!: BoardList[] | null = [];
  columns!:any
  // columns!:Observable<BoardList[]>;

  // columns: BoardList[] = [
  //   {
  //     title: 'first',
  //     condition: true,
  //   },
  //   {
  //     title: 'second',
  //     condition: true,
  //   },
  // ];
 
  constructor(
    private activateRoute: ActivatedRoute,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.data = this.projectService.getData();
    this.columns = this.data.columns
  }
  newColumn() {
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
        let value = result?.column.condition;
        const data = result?.column
        console.log(result?.column,this.columns)
        const checkTitle = result?.column.title;
        const checkDescription = result?.column.description;
        if (!checkTitle && !checkDescription) {
          value = false;
        }
        if (!result || !value) {
          return;
        }
        this.columns?.push(result?.column)
        this.data.columns = this.columns;        
        console.log(this.data)
        this.store.collection('boards').doc(this.data.id).set(this.data); 
      });
  }
  edit(event: any, column: BoardList) {
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
        console.log(result)
        let checkTitle = result?.column.title;
        console.log(checkTitle,result)
        if (!checkTitle || !result) {
          return;
        }
        column.title = checkTitle;
        console.log(column.title)
        // const dataList = this.columns;

        // const taskIndex = dataList.indexOf(column);

        // if (result.delete) {
        //   dataList.splice(taskIndex, 1);
        // } else {
        //   let newTitle = dataList[taskIndex];

        //   newTitle.title = checkTitle;
        // }
      });
  }
  remove(event: any, column: BoardList) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {},
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
      //   const valueCondition = result?.condition;
      //   console.log(result);
      //   if (!valueCondition) {
      //     // console.log(valueCondition)
      //     const dataList = this.columns;
      //     const taskIndex = dataList.indexOf(column);
      //     dataList.splice(taskIndex, 1);
      //   } else {
      //     // console.log(valueCondition)
      //   }
      //   // console.log(this.columns)
      });
  }
  addTask(column: BoardList) {

    const dialogRef = this.dialog.open(DialogTaskComponent, {
      height: '400px',
      width: '600px',
      data: {},
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DialogTaskResult | undefined) => {
        const task = result?.task;
        if (!task) {
          return;
        }
        if (!column.tasks && typeof task === 'string') {
          column.tasks = [];
          column.tasks.push(task);
        } else {
          column?.tasks?.push(task);
        }
      });
  }

  editTask(event: any, task: Task, column: BoardList) {
    console.log('edit', column.tasks, task);
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogTaskComponent, {
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
      .subscribe((result: DialogTaskResult | undefined) => {
        const checkResult = result?.task;
        if (!result) {
          return;
        }

        if (typeof checkResult === 'string') {
          const dataList = column.tasks;
          if (dataList) {
            const taskIndex = dataList.findIndex((item) => item === task);
            dataList.splice(taskIndex, 1, checkResult);
          }
        }
      });
  }

  removeTask(event: any, task: Task, column: BoardList) {
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

        if (!valueCondition) {

          const dataList = column.tasks;
          console.log(dataList);
          if (dataList) {
          const taskIndex = dataList.findIndex((item) => item === task);
          dataList.splice(taskIndex, 1);
        }
      }

      });
  }
}
