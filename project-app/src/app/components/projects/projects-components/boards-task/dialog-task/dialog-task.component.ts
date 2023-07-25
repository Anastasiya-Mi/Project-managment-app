import { Component, Inject,Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Boards,BoardList,Task} from '../../../Boards';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogTaskData
  ) {}

  cancel(): void {
    // this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.condition = false;    
    this.dialogRef.close(this.data);

  }
}

export interface DialogTaskData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface DialogTaskResult {
  task: Task
  // column: BoardList;
  delete?: boolean;
}