import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { User } from '../../User';
import { ImageUploadService } from '../services/image-upload.service';
import { UsersService } from '../services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

// export class UserProfileComponent {
//   // profileForm : FormGroup;
//   user$ = this.usersService.currentUserProfile$;
//   // user = getAuth().currentUser;
// // console.log(user$)
// profileForm = new FormGroup({
//   uid: new FormControl(''),
//   displayName: new FormControl(''),
//   firstName: new FormControl(''),
//   lastName: new FormControl(''),
//   phone: new FormControl(''),
//   address: new FormControl(''),
// });

//   constructor(
//     // private imageUploadService: ImageUploadService,
//     // private toast: HotToastService,
//     private usersService: UsersService,
//     private fb: NonNullableFormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.usersService.currentUserProfile$
//       .pipe(
//         untilDestroyed(this), 
//       tap(console.log))
//       .subscribe((user) => {
//         this.profileForm.patchValue({ ...user });
//       });
//       // console.log(this.auth.currentUser)
//       // console.log(this.usersService.currentUserProfile$)
//       // // const user = getAuth().currentUser;
//       // console.log(this.user)
//       // if (this.user !== null) {
//       //   // The user object has basic properties such as display name, email, etc.
//       //   const displayName = this.user.displayName;
//       //   const email = this.user.email;
//       //   const photoURL = this.user.photoURL;
//       //   const emailVerified = this.user.emailVerified;
//       //   // const password = user.password;
      
//       //   // The user's ID, unique to the Firebase project. Do NOT use
//       //   // this value to authenticate with your backend server, if
//       //   // you have one. Use User.getToken() instead.
//       //   const uid = this.user.uid;
//       //   console.log(email,this.user,'user')
//       }
      


//   uploadFile(event: any, { uid }: User) {
//     // this.imageUploadService
//     //   .uploadImage(event.target.files[0], `images/profile/${uid}`)
//     //   .pipe(
//     //     this.toast.observe({
//     //       loading: 'Uploading profile image...',
//     //       success: 'Image uploaded successfully',
//     //       error: 'There was an error in uploading the image',
//     //     }),
//     //     switchMap((photoURL) =>
//     //       this.usersService.updateUser({
//     //         uid,
//     //         photoURL,
//     //       })
//     //     )
//     // //   )
//     //   .subscribe();
//   }

//   saveProfile() {
//   //   const { uid, ...data } = this.profileForm.value;

//   //   if (!uid) {
//   //     return;
//   //   }

//   //   this.usersService
//   //     .updateUser({ uid, ...data })
//   //     .pipe(
//   //       // this.toast.observe({
//   //       //   loading: 'Saving profile data...',
//   //       //   success: 'Profile updated successfully',
//   //       //   error: 'There was an error in updating the profile',
//   //       // })
//   //     )
//   //     .subscribe();
//   // }
// }
// }

export class UserProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

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
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadFile(event: any, { uid }: User) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
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
}