import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Boards} from '../../Boards';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  private backupTask: Partial<Boards> = { ...this.data.board };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancel(): void {
    this.data.board.title = this.backupTask.title;
    this.data.board.description = this.backupTask.description;
    this.data.board.condition = false;    
    this.dialogRef.close(this.data);

  }
}






export interface DialogData {
  board: Partial<Boards>;
  enableDelete: boolean;
}

export interface DialogResult {
  board: Boards;
  delete?: boolean;
}