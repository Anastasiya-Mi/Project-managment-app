import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { BoardsComponent } from './projects-components/boards/boards.component';
import { BoardsTaskComponent } from './projects-components/boards-task/boards-task.component';
import { HeaderComponent } from './projects-components/header/header.component';
import { FooterComponent } from './projects-components/footer/footer.component';


@NgModule({
  declarations: [
    BoardsComponent,
    BoardsTaskComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
