import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { User } from '../../User';
import { ImageUploadService } from '../services/image-upload.service';
import { UsersService } from '../services/user.service';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  // user$ = this.usersService.currentUserProfile$;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });

  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.usersService.currentUserProfile$
    //   .pipe(untilDestroyed(this), tap(console.log))
    //   .subscribe((user) => {
    //     this.profileForm.patchValue({ ...user });
    //   });
  }

  uploadFile(event: any, { uid }: User) {
    // this.imageUploadService
    //   .uploadImage(event.target.files[0], `images/profile/${uid}`)
    //   .pipe(
    //     this.toast.observe({
    //       loading: 'Uploading profile image...',
    //       success: 'Image uploaded successfully',
    //       error: 'There was an error in uploading the image',
    //     }),
    //     switchMap((photoURL) =>
    //       this.usersService.updateUser({
    //         uid,
    //         photoURL,
    //       })
    //     )
    //   )
    //   .subscribe();
  }

  saveProfile() {
    // const { uid, ...data } = this.profileForm.value;

    // if (!uid) {
    //   return;
    // }

    // this.usersService
    //   .updateUser({ uid, ...data })
    //   .pipe(
    //     this.toast.observe({
    //       loading: 'Saving profile data...',
    //       success: 'Profile updated successfully',
    //       error: 'There was an error in updating the profile',
    //     })
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['/projects']);
    //   });
  }
}
