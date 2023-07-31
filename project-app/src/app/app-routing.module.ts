import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BoardsComponent } from './components/boards/boards.component';
import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'
import { ProfileComponent } from './components/profile/profile.component';
import { BoardTaskComponent } from './components/board-task/board-task.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToBoards = () => redirectLoggedInTo(['boards']);

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartPageComponent },
  {
    path: 'login',
    component: LoginComponent,
    // ...canActivate(redirectToBoards),
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    // ...canActivate(redirectToBoards),
  },
  {
    path: 'boards',
    component: BoardsComponent,
    // ...canActivate(redirectToLogin),
  },
  {
    path: 'task',
    component: BoardTaskComponent,
    // ...canActivate(redirectToLogin),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin),
  },
  // {
  //   path: 'projects',
  //   loadChildren: () =>
  //     import('./components/projects/projects.module').then(
  //       (mod) => mod.ProjectsModule
  //     ),
  // },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
