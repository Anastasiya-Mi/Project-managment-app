import { Component,Inject,Input } from '@angular/core';
import { 
  // MatDialog, 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  // MatDialogModule 
} from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';
// import { DialogResult } from '../dialog/dialog.component';
import { Boards,BoardList,Task } from '../../Boards';
@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css']
})
export class ConfirmWindowComponent {
  @Input() board: Boards | null = null;
  @Input() column: BoardList | null = null;
  constructor(
    public dialogRef: MatDialogRef<ConfirmWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogResultWindow
  ) {}

resultOfChoice(event:any){
  let target = event.target.value;
  if(target === 'true'){
    console.log(this.data)
    this.data.condition = false; 
    // this.data.column.condition = false;
    // console.log(this.data)
  //  const result = target;
  }
  else{
    // this.data.board.condition = true;
    this.data.condition = true;
    // this.data.column.condition = false;
    // console.log(this.data.condition)
  }
  this.dialogRef.close(this.data)
}
}

export interface DialogResultWindow {
  result: Boards | BoardList;
  // result
  // column: BoardList;
  condition?: boolean;
}