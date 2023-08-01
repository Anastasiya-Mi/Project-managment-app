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

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  user$ = this.usersService.currentUserProfile$;
  boardList = this.boardService.currentUserProfileBoardList()
    .valueChanges({ idField: 'id' }) as Observable<Boards[]>;
  constructor(
    private boardService: BoardService,
    private router: Router,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private authService: AuthService,
    private usersService: UsersService
  ) { }


  redirectTo(board: Boards) {    
    this.boardService.setData(board);
    this.router.navigate(['task']);
  }
  edit(event: any, board: Boards, user: ProfileUser): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        board: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: DialogResult | undefined) => {
      const resultId = board.id;
      let checkTitle = result?.board.title;
      let checkDescription = result?.board.description;
      if (!checkTitle && !checkDescription) {
        return;
      }
      if (!result) {
        return;
      }
      this.store.collection('users').doc(user?.uid).collection('boards').doc(resultId).update(result.board);
    });
  }

  remove(event: any, board: Boards, user: ProfileUser) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      width: '250px',
      height: '250px',
      data: {},
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        const valueCondition = result?.condition;
        const resultId = board.id;
        if (!valueCondition)
          this.store.collection('users').doc(user?.uid).collection('boards').doc(resultId).delete();
      });
  }
}
