import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupLoginComponent } from './components/auth/signup-login/signup-login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/guard/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { RegisterComponent } from './components/auth/signup-login/Register/register/register.component';

const routes: Routes = [
  {
    path: 'signupLogin',
    component: SignupLoginComponent
  },
  {
    path: '',
    redirectTo: 'signupLogin',
    pathMatch: 'full'
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['User'],
            redirectTo: '/signupLogin'
          }
        },
        loadChildren: () => import('./components/user/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'admin',
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['Admin'],
            redirectTo: '/signupLogin'
          }
        },
        loadChildren: () => import('./components/admin/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
