import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Boards, BoardList, Task } from '../../models/boards';
import {
  ConfirmWindowComponent,
  DialogResultWindow,
} from '../confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';
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

export class BoardTaskComponent {
  boardListStatus = this.boardService.currentUserProfileBoardListColumnStatus()
  id!: any;
  data!: any;
  tasks!: any;
  user$ = this.usersService.currentUserProfile$;
  boardList = this.boardService.currentUserProfileBoardList()
    .valueChanges({ idField: 'id' }) as Observable<Boards[]>;

  constructor(
    private activateRoute: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private usersService: UsersService
  ) {
    this.data = this.boardService.getData();
  }

  ngOnInit(): void {
  }
  newColumn(user: ProfileUser) {
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
        result.column.tasks = [];
        this.store.collection('users').doc(user.uid).collection('boards')
          .doc(dataId).collection('columns').add(result.column)

      })
  }
}
