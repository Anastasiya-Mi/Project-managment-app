import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DialogTaskComponent } from '../../../../dialog-task/dialog-task.component';
import { DialogTaskResult } from '../../../../dialog-task/dialog-task.component';
import { Boards, BoardList, Task } from '../../../Boards';
import {
  ConfirmWindowComponent,
  DialogResultWindow,
} from '../../../../confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-column-task-list',
  templateUrl: './column-task-list.component.html',
  styleUrls: ['./column-task-list.component.css'],
})
export class ColumnTaskListComponent {
  @Input() task: Task[] | null = null;
  @Output() buttonClick = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {}

  // addTask(task: Task){
  // const dialogRef = this.dialog.open(DialogTaskComponent, {
  //   height: '400px',
  //   width: '600px',
  //   data: {
  //     task: {
  //       condition: true,
  //     },
  //   },
  // });
  // dialogRef
  //   .afterClosed()
  //   .subscribe((result: DialogTaskResult | undefined) => {
  //     let value = result?.task.condition;
  //     // const valueId = JSON.stringify(result?.task.id);
  //     // const checkTitle = result?.task.title;
  //     const checkDescription = result?.task.description;
  //     if (!checkDescription) {
  //       value = false;
  //     }
  //     if (!result || !value) {
  //       return;
  //     }

  //     this.tasks?.push(result.task);
  // this.newTask.emit('i');
  // console.log(this.tasks)
  // });
  // }

  // editTask(task:Task){

  //   const dialogRef = this.dialog.open(DialogTaskComponent, {
  //     height: '400px',
  //     width: '600px',
  //     data: {
  //       column:{
  //         condition:true
  //       }

  //     },
  //   });
  // console.log(this.todo);
  // dialogRef
  // .afterClosed()
  // .subscribe((result: DialogTaskResult | undefined) => {
  //   const resultId = result?.task?.id;
  //   let value = result?.task.condition;
  //   let checkTitle = result?.task.title;
  //   console.log(checkTitle)
  // let checkDescription = result?.column.description;
  // console.log(result)
  // if (!checkTitle) {
  //   value = false;
  // this.store.collection('list').doc(resultId).delete();
  // }
  //   if (!result) {
  //     return;
  //   }
  //   value = true;
  // const dataList = this.task;
  // console.log(dataList)
  // const taskIndex = dataList?.indexOf(task);
  // console.log(taskIndex,'taskIndex')
  // if (result.delete) {
  //   dataList?.splice(taskIndex, 1);
  // } else {
  //   console.log(task,'board')
  //   console.log(result.task,'result')
  //   dataList[taskIndex] = result.task;
  // }
  // });

  // }
  removeTask(task: Task) {
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {},
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        const valueCondition = result?.condition;
        console.log(result);
        if (!valueCondition) {
          // console.log(valueCondition)
          // const dataList = this.columns;
          // const taskIndex = dataList.indexOf(column);
          // dataList.splice(taskIndex, 1);
        } else {
          // console.log(valueCondition)
        }
        // console.log(this.columns)
      });
  }
}
