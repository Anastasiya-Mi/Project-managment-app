import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { RegistrationComponent } from './components/registration/registration.component';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from "firebase/app";
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore } from "firebase/firestore";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardsComponent } from './components/boards/boards.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProfileComponent } from './components/profile/profile.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmWindowComponent } from './components/confirm-window/confirm-window.component';
import { DialogColumnComponent } from './components/dialog-column/dialog-column.component';
import { DialogTaskComponent } from './components/dialog-task/dialog-task.component'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BoardTaskComponent } from './components/board-task/board-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartPageComponent,
    RegistrationComponent,
    BoardsComponent,
    ProfileComponent,
    DialogComponent,
    ConfirmWindowComponent,
    DialogColumnComponent,
    DialogTaskComponent,
    BoardTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
