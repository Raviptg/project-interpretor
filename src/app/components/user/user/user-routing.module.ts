import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRequestComponent } from './user-request/user-request/user-request.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: UserComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'request',
    component:UserRequestComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
