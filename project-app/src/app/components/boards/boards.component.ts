import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { concatMap, from, Observable, of, switchMap, combineLatest, startWith, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Boards, BoardList, Task } from '../../models/boards';
import { BoardService } from '../../services/board.service';
import { DialogComponent, DialogResult } from '../dialog/dialog.component';
import { ConfirmWindowComponent, DialogResultWindow } from '../confirm-window/confirm-window.component';
import { ProfileUser } from '../../models/user-profile';
import { user } from '@angular/fire/auth';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent {
  user$ = this.usersService.currentUserProfile$;
  searchControl = new FormControl('');
  boardStatus = this.boardService.currentUserProfileBoardListStatus()
  boardList = this.boardService.currentUserProfileBoardList()
    .valueChanges({ idField: 'id' }) as Observable<Boards[]>;

  ngOnInit(): void {
  }

  constructor(
    private boardService: BoardService,
    private router: Router,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  newBoard(user: ProfileUser): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        board: {
          condition: true,
        },
      },
    });
    dialogRef.afterClosed().subscribe((result: DialogResult | undefined) => {
      let value = result?.board.condition;
      const userIds = user.uid
      let checkTitle = result?.board.title;
      let checkDescription = result?.board.description;
      if (!checkTitle && !checkDescription) {
        value = false;
      }
      if (!result || !value) {
        return;
      } else {
        result.board.id = userIds;   
        if(!checkTitle)   {
          checkTitle = '';
        }if(!checkDescription)   {
          checkDescription = '';
        }
        this.boardService.currentUserProfileBoardList().add({
          'id': result.board.id,
          'title': checkTitle,
          'description': checkDescription,
        })
      }
    });
  }
}
