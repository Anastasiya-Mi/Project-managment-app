import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './projects-components/boards/boards.component';
import { BoardsTaskComponent } from './projects-components/boards-task/boards-task.component';
import { UserResolver } from './resolvers/user.resolver';
import { UserProfileComponent } from './projects-components/user-profile/user-profile.component';

const routes: Routes = [
  //   {path:'',component:BoardsComponent,
  // children:[
  //   {path:'title',component:BoardsTaskComponent}
  // ]}
  { path: '', component: BoardsComponent },
  { path: 'title', component: BoardsTaskComponent },
  { path: 'profile', component: UserProfileComponent },
  // resolve:{
  //   user: UserResolver
  // }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
