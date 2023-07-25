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
@Component({
  selector: 'app-boards-task',
  templateUrl: './boards-task.component.html',
  styleUrls: ['./boards-task.component.css']
})
export class BoardsTaskComponent {

id!: string;
user!:Observable<User>;
data!:any;
column: BoardList[] | null = null;
tasks:Task[] | null = null;
currentItem ='value';
// title!:string
// description!:string

columns: BoardList[] = [
{
title:'first',
condition: true,
tasks:[{

}]
},
{
  title:'second',
  condition: true,
  tasks:[{
  
  }]
  }
];
constructor(private activateRoute:ActivatedRoute, private projectService:ProjectService,private dialog: MatDialog){}

ngOnInit():void{
  // this.activateRoute.params.subscribe((params:Params)=>this.id = params?.['id']);
  // this.user = this.projectService.getPerson(this.id)
  // this.user = this.activateRoute.data.pipe(map((data) => data?.['user'] ))

  this.data = this.projectService.getData();
  // this.title = this.data.title;
  // console.log(this.title)
 
}
newColumn(){
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
      // const valueId = JSON.stringify(result?.task.id);
      const checkTitle = result?.column.title;
      const checkDescription = result?.column.description;
      if (!checkTitle && !checkDescription) {
        value = false;
      }
      if (!result || !value) {
        return;
      }

      this.columns.push(result.column);   
      console.log(this.columns)     
    });
}
edit(event:any,column: BoardList){
      // console.log('edit', event.target)
      event.stopPropagation();
      const dialogRef = this.dialog.open(DialogColumnComponent, {
        height: '400px',
        width: '600px',
        data: {
          column:{
            condition:true
          }
          
        },
      });
      // console.log(this.todo);
      dialogRef
        .afterClosed()
        .subscribe((result: DialogColumnResult | undefined) => {
          const resultId = result?.column?.id;
          let value = result?.column.condition;
          let checkTitle = result?.column.title;
          console.log(checkTitle)
          // let checkDescription = result?.column.description;
          console.log(result)
          if (!checkTitle) {
            value = false;
            // this.store.collection('list').doc(resultId).delete();
        }
          if (!result) {
            return;
          }
          value = true;
          const dataList = this.columns;
          console.log(dataList)
          const taskIndex = dataList.indexOf(column);
          console.log(taskIndex,'taskIndex')
          if (result.delete) {
            dataList.splice(taskIndex, 1);
          } else {
            console.log(column,'board')
            console.log(result.column,'result')
            dataList[taskIndex] = result.column;
          }
        });

}
remove(event:any,column: BoardList){
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
      console.log(result)
      if (!valueCondition) {
        console.log(valueCondition)
        const dataList = this.columns;
        const taskIndex = dataList.indexOf(column);
        dataList.splice(taskIndex, 1);
      } else{
        // console.log(valueCondition)      
      }      
      // console.log(this.columns)
    });
}
addTask(column: BoardList){
  console.log(column)
  const dialogRef = this.dialog.open(DialogTaskComponent, {
    height: '400px',
    width: '600px',
    data: {
      tasks: {
        condition: true,
      },
    },
  });
  dialogRef
    .afterClosed()
    .subscribe((result: DialogTaskResult | undefined) => {
      console.log(result)
      let value = result?.task.condition;
      // const valueId = JSON.stringify(result?.task.id);
      // const checkTitle = result?.task.title;
      const checkDescription = result?.task.description;
      if (!checkDescription) {
        value = false;
      }
      if (!result || !value) {
        return;
      }
      console.log(result.task)
      this.columns.push(result.task);   
      console.log(this.column)     
    });
}


// editTask(event:any,column: BoardList){
//   // console.log('edit', event.target)
//   event.stopPropagation();
//   const dialogRef = this.dialog.open(DialogColumnComponent, {
//     height: '400px',
//     width: '600px',
//     data: {
//       column:{
//         condition:true
//       }
      
//     },
//   });
//   // console.log(this.todo);
//   dialogRef
//     .afterClosed()
//     .subscribe((result: DialogColumnResult | undefined) => {
//       const resultId = result?.column?.id;
//       let value = result?.column.condition;
//       let checkTitle = result?.column.title;
//       console.log(checkTitle)
//       // let checkDescription = result?.column.description;
//       console.log(result)
//       if (!checkTitle) {
//         value = false;
//         // this.store.collection('list').doc(resultId).delete();
//     }
//       if (!result) {
//         return;
//       }
//       value = true;
//       const dataList = this.columns;
//       console.log(dataList)
//       const taskIndex = dataList.indexOf(column);
//       console.log(taskIndex,'taskIndex')
//       if (result.delete) {
//         dataList.splice(taskIndex, 1);
//       } else {
//         console.log(column,'board')
//         console.log(result.column,'result')
//         dataList[taskIndex] = result.column;
//       }
//     });

// }
// removeTask(event:any,column: BoardList){
//   event.stopPropagation();
//   const dialogRef = this.dialog.open(ConfirmWindowComponent, {
//     height: '100px',
//     width: '200px',
//     data: {      
//     },
//   });

//   dialogRef
//     .afterClosed()
//     .subscribe((result: DialogResultWindow | undefined) => {
//       const valueCondition = result?.condition;   
//       console.log(result)
//       if (!valueCondition) {
//         console.log(valueCondition)
//         const dataList = this.columns;
//         const taskIndex = dataList.indexOf(column);
//         dataList.splice(taskIndex, 1);
//       } else{
//         // console.log(valueCondition)      
//       }      
//       // console.log(this.columns)
//     });
// }

}
