import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupLoginComponent } from './components/auth/signup-login/signup-login.component';
import { UserComponent } from './components/user/user/user.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ApiInterceptor } from './services/interceptor/api.interceptor';
import { AuthGuard } from './services/guard/auth.guard';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from './common/common-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './components/admin/admin/header/admin-header/admin-header.component';
import { UserHeaderComponent } from './components/user/user/user-header/user-header/user-header.component';
import { UserModule } from './components/user/user/user.module';
import { UserRequestComponent } from './components/user/user/user-request/user-request/user-request.component';
import { AdminRequestComponent } from './components/admin/admin/admin-request/admin-request/admin-request.component';
import { RegisterComponent } from './components/auth/signup-login/Register/register/register.component';
import { MaterialModule } from './common/material/material/material.module';
import { NewInterpeterComponent } from './components/admin/new-interpeter/new-interpeter.component';
import { NotAuthorizedComponent } from './common/components/not-authorized/not-authorized.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupLoginComponent,
    UserComponent,
    AdminComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    UserRequestComponent,
    AdminRequestComponent,
    RegisterComponent,
    NewInterpeterComponent,
    NotAuthorizedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      // closeButton: true,
      // progressBar: true,
      // progressAnimation: 'increasing',
      // preventDuplicates: true
    })
    
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
