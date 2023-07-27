import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { BoardsComponent } from './projects-components/boards/boards.component';
import { BoardsTaskComponent } from './projects-components/boards-task/boards-task.component';
import { HeaderComponentBoard } from './projects-components/header/header.component';
import { FooterComponentBoard } from './projects-components/footer/footer.component';
import { DialogComponent } from './projects-components/dialog/dialog.component';
import { ConfirmWindowComponent } from './projects-components/confirm-window/confirm-window.component';
import { DialogColumnComponent } from './projects-components/boards-task/dialog-column/dialog-column.component';
import { DialogTaskComponent } from './projects-components/boards-task/dialog-task/dialog-task.component';
import { ColumnTaskListComponent } from './projects-components/boards-task/column-task-list/column-task-list.component';
import { UserProfileComponent } from './projects-components/user-profile/user-profile.component';
// import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardsTaskComponent,
    HeaderComponentBoard,
    FooterComponentBoard,
    DialogComponent,
    ConfirmWindowComponent,
    DialogColumnComponent,
    DialogTaskComponent,
    ColumnTaskListComponent,
    UserProfileComponent,
    // HeaderComponentFirst
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProjectsModule {}
