import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:StartPageComponent},
  {path:'login',component:LoginComponent},
  {path:'projects',
  canActivate: [AuthGuard],
  canDeactivate: [AuthGuard],
  loadChildren:()=>import('./components/projects/projects.module')
  .then(mod =>mod .ProjectsModule)},
  {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
