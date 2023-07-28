import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BoardsComponent } from './components/boards/boards.component';


const routes: Routes = [
  {path:'',pathMatch:'full', component:StartPageComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'boards',component:BoardsComponent},
  {path:'projects',
  loadChildren:()=>import('./components/projects/projects.module')
  .then(mod =>mod .ProjectsModule)},
  {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
