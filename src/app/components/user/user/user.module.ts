import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/common/material/material/material.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './user-header/user-header/user-header.component';
import { UserRequestComponent } from './user-request/user-request/user-request.component';
import { HomeComponent } from '../../home/home.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
