import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './projects-components/boards/boards.component';
import { BoardsTaskComponent } from './projects-components/boards-task/boards-task.component';

const routes: Routes = [
//   {path:'',component:BoardsComponent,
// children:[
//   {path:'user/:id',component:BoardsTaskComponent}
// ]}
{path:'',component:BoardsComponent},
{path:'user/:id',component:BoardsTaskComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
