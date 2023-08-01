import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Boards, BoardList, Task } from '../../models/boards';

@Component({
  selector: 'app-dialog-column',
  templateUrl: './dialog-column.component.html',
  styleUrls: ['./dialog-column.component.css'],
})
export class DialogColumnComponent {
  private backupTask: Partial<BoardList> = { ...this.data.column };

  constructor(
    public dialogRef: MatDialogRef<DialogColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogColumnData
  ) { }

  cancel(): void {
    this.data.column.title = this.backupTask.title;
    this.data.column.condition = false;
    this.dialogRef.close(this.data);
  }
}

export interface DialogColumnData {
  column: Partial<BoardList>;
  enableDelete: boolean;
}

export interface DialogColumnResult {
  column: BoardList;
  delete?: boolean;
}
