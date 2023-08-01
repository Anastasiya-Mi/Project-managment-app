import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { Boards, BoardList, Task } from '../../models/boards';
@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css'],
})
export class ConfirmWindowComponent {
  @Input() board: Boards | null = null;
  @Input() column: BoardList | null = null;
  constructor(
    public dialogRef: MatDialogRef<ConfirmWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogResultWindow
  ) { }

  resultOfChoice(event: any) {
    let target = event.target.value;
    if (target === 'true') {      
      this.data.condition = false;
    } else {
      this.data.condition = true;
    }
    this.dialogRef.close(this.data);
  }
}

export interface DialogResultWindow {
  result: Boards | BoardList;
  condition?: boolean;
}
