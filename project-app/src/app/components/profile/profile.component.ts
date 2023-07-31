import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../services/users.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../../models/user-profile';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  ConfirmWindowComponent,
  DialogResultWindow,
} from '../confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user$ = this.usersService.currentUserProfile$;
  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
  });

  constructor(
    private authService: AuthService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private store: AngularFirestore,
  ) {}
  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        concatMap((photoURL) =>
          this.usersService.updateUser({
            uid: user.uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const { uid, ...data } = this.profileForm.value;
    if (!uid) {
      return;
    }
    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }

  removeProfile(user: ProfileUser) {
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      height: '100px',
      width: '200px',
      data: {},
    });

    dialogRef
      .afterClosed()
      .subscribe((result: DialogResultWindow | undefined) => {
        // const dataId = this.data.id;
        const valueCondition = result?.condition;
        // const dataId = this.data.id;
        // const columnId = column.id;

        if (valueCondition) {
          return;
        }
          // const dataList = column.tasks;
          // console.log(dataList);
          // if (dataList) {
          //   // const taskIndex = dataList.findIndex((item) => item === task);
          //   dataList.splice(taskIndex, 1);
          // }
        //   console.log(column);
        //   console.log(this.data);
          this.store
        .collection('users')
        .doc(user.uid).delete()
        // .collection('boards')
        // .doc(dataId)
        // .collection('columns')
        // .doc(columnId)
        // .update(column);
        this.usersService.deleteUserAccount();
      });
// }
    // this.usersService.removeUser(user);
    // this.usersService.deleteUserAccount();
  }
}
