import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { CommonModule as CommonUtils } from 'src/app/common/common-module';
import { AdminRoutingModule } from './admin-routing.module';
import { InterpeterRequestComponent } from './interpeter-request/interpeter-request.component';
import { MaterialModule } from 'src/app/common/material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterpeterRequestFormComponent } from './interpeter-request/interpeter-request-form/interpeter-request-form.component';


@NgModule({
  declarations: [
    InterpeterRequestComponent,
    InterpeterRequestFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }
