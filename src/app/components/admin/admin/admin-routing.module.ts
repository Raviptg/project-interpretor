import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRequestComponent } from './admin-request/admin-request/admin-request.component';
import { NewInterpeterComponent } from '../new-interpeter/new-interpeter.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin-request',
    component: AdminRequestComponent
  },
  {
    path: 'New-interpeter-request',
    component: NewInterpeterComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule {}
