import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { concatMap, from, Observable, of, switchMap,combineLatest, startWith,map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Boards,BoardList,Task} from '../../models/boards';
import { BoardService } from '../../services/board.service';
import { DialogComponent,DialogResult } from '../dialog/dialog.component';
import { ConfirmWindowComponent,DialogResultWindow } from '../confirm-window/confirm-window.component';
import { ProfileUser} from '../../models/user-profile';
import { user } from '@angular/fire/auth';
import { FormControl,NonNullableFormBuilder } from '@angular/forms';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent {
  user$ = this.usersService.currentUserProfile$;
  searchControl = new FormControl('');

  ngOnInit(): void {}

  constructor(
    private boardService: BoardService,
    private router: Router,
    private dialog: MatDialog,
    private store: AngularFirestore,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  boards = this.store
    .collection('boards')
    .valueChanges({ idField: 'id' }) as Observable<Boards[]>;

  redirectTo(board: Boards) {
    console.log(board);
    this.boardService.setData(board);
    this.router.navigate(['projects/title']);
  }

  redirectToBoards() {}

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
      const checkTitle = result?.board.title;
      const checkDescription = result?.board.description;
      if (!checkTitle && !checkDescription) {
        value = false;
      }
      if (!result || !value) {
        return;
      } else {
        this.store.collection('boards').add(result.board);
      }
    });
  }

  edit(event: any, board: Boards): void {
    // console.log('edit', board);
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
      // console.log('edit', resultId);
      let checkTitle = result?.board.title;
      let checkDescription = result?.board.description;
      if (!checkTitle && !checkDescription) {
        return;
      }
      if (!result) {
        return;
      }
      this.store.collection('boards').doc(resultId).update(result.board);
    });
  }

  remove(event: any, board: Boards) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '150px',
      width: '200px',
      data: {},
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        const valueCondition = result?.condition;
        const resultId = board.id;
        if (!valueCondition)
          this.store.collection('boards').doc(resultId).delete();
      });
  }
}
