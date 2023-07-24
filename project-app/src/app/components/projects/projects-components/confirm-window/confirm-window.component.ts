import { Component,Inject,Input } from '@angular/core';
import { 
  // MatDialog, 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  // MatDialogModule 
} from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';
import { DialogResult } from '../dialog/dialog.component';
import { Boards } from '../../Boards';
@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css']
})
export class ConfirmWindowComponent {
  @Input() board: Boards | null = null;
  constructor(
    public dialogRef: MatDialogRef<ConfirmWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogResult
  ) {}
resultOfChoice(event:any){
  let target = event.target.value;
  if(target === 'true'){
    this.data.board.condition = false;
  }
  else{
    this.data.board.condition = true;
  }
  this.dialogRef.close(this.data)
}
}
